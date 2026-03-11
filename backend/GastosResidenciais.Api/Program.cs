using GastosResidenciais.Api.src.modules.pessoas.application.use_cases;
using GastosResidenciais.Api.src.modules.pessoas.domain.repository_interface;
using GastosResidenciais.Api.src.modules.pessoas.infra.repository;
using GastosResidenciais.Api.src.shared.infra.persistence.context;
using GastosResidenciais.Api.src.shared.infra.server.middlewares;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

builder.Services.AddScoped<IPessoaRepository, PessoaRepository>();

builder.Services.AddScoped<CriarPessoaUseCase>();
builder.Services.AddScoped<ListarPessoasUseCase>();
builder.Services.AddScoped<ObterPessoaPorIdUseCase>();
builder.Services.AddScoped<EditarPessoaUseCase>();
builder.Services.AddScoped<DeletarPessoaUseCase>();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.MapControllers();

app.Run();