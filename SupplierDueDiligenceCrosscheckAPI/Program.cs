using Microsoft.EntityFrameworkCore;
using SupplierDueDiligenceCrosscheckAPI.Auth.Services;
using SupplierDueDiligenceCrosscheckAPI.Models;
using SupplierDueDiligenceCrosscheckAPI.Repositories;
using SupplierDueDiligenceCrosscheckAPI.Services;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database Configuration
//var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("InMemoryDatabase"));

// Register Singletons
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

// Register the repositories
builder.Services.AddScoped<IProviderRepository, ProviderRepository>();
builder.Services.AddScoped<IHighRiskListRepository, HighRiskListRepository>();
// Register the services
builder.Services.AddScoped<IProviderService, ProviderService>();
builder.Services.AddScoped<IHighRiskListService, HighRiskListService>();
builder.Services.AddScoped<IScreeningService, ScreeningService>();
builder.Services.AddScoped<IUserService, UserService>();


// CORS
builder.Services.AddCors();

// Health Checks
builder.Services.AddHealthChecks();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Swagger Configuration
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SupplierDueDiligenceCrosscheckAPI");
    });
}

// Exception Handling
// app.UseExceptionHandler("/error");

app.UseHttpsRedirection();

// CORS
app.UseCors(options => options.WithOrigins("https://localhost:4200", "http://localhost:4200").AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
