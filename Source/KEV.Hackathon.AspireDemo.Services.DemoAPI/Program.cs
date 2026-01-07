// Copyright (c) 2026 KEV Sofware Inc.

namespace KEV.Hackathon;

internal static class Program
{
    private static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.AddServiceDefaults();

        var app = builder.Build();
        app.MapDefaultEndpoints();

        await app.RunAsync();
    }
}