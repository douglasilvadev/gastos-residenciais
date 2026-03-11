using GastosResidenciais.Api.src.modules.categorias.application.use_cases;
using GastosResidenciais.Api.src.modules.categorias.domain.repository_interface;
using GastosResidenciais.Api.src.modules.categorias.infra.repository;
using GastosResidenciais.Api.src.modules.pessoas.application.use_cases;
using GastosResidenciais.Api.src.modules.pessoas.domain.repository_interface;
using GastosResidenciais.Api.src.modules.pessoas.infra.repository;
using GastosResidenciais.Api.src.modules.transacoes.application.use_cases;
using GastosResidenciais.Api.src.modules.transacoes.domain.domain_services;
using GastosResidenciais.Api.src.modules.transacoes.domain.repository_interface;
using GastosResidenciais.Api.src.modules.transacoes.infra.repository;
using GastosResidenciais.Api.src.shared.infra.persistence.context;
using GastosResidenciais.Api.src.shared.infra.server.middlewares;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configuração do Entity Framework Core com PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Serviços base da API
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuração de CORS para permitir acesso do front-end React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// Repositórios
builder.Services.AddScoped<IPessoaRepository, PessoaRepository>();
builder.Services.AddScoped<ICategoriaRepository, CategoriaRepository>();
builder.Services.AddScoped<ITransacaoRepository, TransacaoRepository>();

// Domain services
builder.Services.AddScoped<TransacaoDomainService>();

// Use cases - Pessoas
builder.Services.AddScoped<CriarPessoaUseCase>();
builder.Services.AddScoped<ListarPessoasUseCase>();
builder.Services.AddScoped<ObterPessoaPorIdUseCase>();
builder.Services.AddScoped<EditarPessoaUseCase>();
builder.Services.AddScoped<DeletarPessoaUseCase>();

// Use cases - Categorias
builder.Services.AddScoped<CriarCategoriaUseCase>();
builder.Services.AddScoped<ListarCategoriasUseCase>();

// Use cases - Transações
builder.Services.AddScoped<CriarTransacaoUseCase>();
builder.Services.AddScoped<ListarTransacoesUseCase>();
builder.Services.AddScoped<ConsultarTotaisPorPessoaUseCase>();
builder.Services.AddScoped<ConsultarTotaisPorCategoriaUseCase>();

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