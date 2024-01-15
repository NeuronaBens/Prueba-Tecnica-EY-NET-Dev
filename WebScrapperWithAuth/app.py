from flask import Flask, render_template, url_for, redirect, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_bcrypt import Bcrypt
from web_scrapper import scrape_offshore_leaks

app = Flask(__name__)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'B9799226F784E'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

#Rate-limit functionality
from flask_limiter import Limiter 
from flask_limiter.util import get_remote_address
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://",
)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/')
def home():
    return render_template('home.html')


#Authentication endpoints
#########################
@app.route('/register', methods=['POST'])
def register():
    username = request.form.get('username')
    password = request.form.get('password')
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return "User created"

@app.route('/login', methods=['POST'])
def login():
    auth = request.authorization
    if auth and auth.type == 'basic':
        username = auth.username
        password = auth.password
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            login_user(user)
            return "User logged in"
    return "Invalid credentials"
    
@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return "User logged out"

#business logic related endpoints
#########################
@app.route('/get-scrape', methods=['GET'])
@login_required
@limiter.limit("20/minute", key_func = lambda : current_user.username)
def get_scrape():
    # Get parameters from the query string
    entity = request.args.get('entity', default='', type=str)
    scrape_result = scrape_offshore_leaks(entity)
    return jsonify(scrape_result) #final result as json

if __name__ == "__main__":
    app.run(debug=True)
