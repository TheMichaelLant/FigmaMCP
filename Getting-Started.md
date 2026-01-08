# Getting Started

Welcome to the KEV Hackathon Aspire Demo project! This guide will help you set up your development environment and get the application running locally.

## Prerequisites

If not already installed, use **Company Portal** to install the following tools:

- **Azure CLI** - Required for Azure authentication
- **Git** - Version control
- **Node.js** - Required for the React frontend
- **WSL** (Windows Subsystem for Linux) - Required for Docker
- **Docker Desktop** - Required for local container emulators
- **Visual Studio 2022** (or later) - Primary IDE for .NET development
- **VS Code** - Optional, useful for frontend development

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://dev.azure.com/kevgroup/Hackathon/_git/Hackathon
cd Hackathon
```

### 2. Authenticate to Azure

Run the following command to authenticate with Azure CLI. This is required for certain cloud-only resources:

```bash
az login
```

Follow the prompts to complete authentication with your KEV credentials.

### 3. Start Docker Desktop

Ensure Docker Desktop is running before starting the application. The project uses Docker container emulators for local development:

- SQL Server
- Azure Storage (Azurite)
- Azure App Configuration

### 4. Install Node.js Dependencies

Navigate to the React frontend project and install dependencies:

```bash
cd Source/KEV.Hackathon.AspireDemo.Web.React
npm install
```

## Running the Application

### Using Visual Studio

1. Open `Aspire-Demo.slnx` in Visual Studio
2. Set `KEV.Hackathon.AspireDemo.AppHost` as the startup project
3. Press **F5** to start debugging

The .NET Aspire AppHost will orchestrate all services including:
- **AspireDemo-API** - The backend API service (opens to `/scalar` for API documentation)
- **AspireDemo-React** - The React frontend (available at `https://localhost:45173`)
- **SQL Server** - Database container
- **Azure Storage Emulator** - Blob storage container
- **Azure App Configuration Emulator** - Configuration container

### Using the Command Line

```bash
cd Source/KEV.Hackathon.AspireDemo.AppHost
dotnet run
```

## Aspire Dashboard

When running the AppHost, the .NET Aspire Dashboard will automatically open. This provides:

- Service health monitoring
- Distributed tracing
- Logs aggregation
- Resource management

## Project Structure

```
Hackathon/
├── Source/
│   ├── KEV.Hackathon.AspireDemo.AppHost/       # Aspire orchestration
│   ├── KEV.Hackathon.AspireDemo.Services/      # Shared service extensions
│   ├── KEV.Hackathon.AspireDemo.Services.DemoAPI/  # Backend API
│   └── KEV.Hackathon.AspireDemo.Web.React/     # React frontend
└── Aspire-Demo.slnx                            # Solution file
```

## API Documentation

Once the application is running, API documentation is available via Scalar at:

- `https://localhost:<port>/scalar`

The API uses Azure AD (Entra ID) authentication. Use the OAuth2 flow in Scalar to authenticate and test endpoints.

## Troubleshooting

### Docker containers not starting

Ensure Docker Desktop is running and has sufficient resources allocated.

### Azure authentication issues

Re-run `az login` to refresh your Azure credentials.

### Node.js dependency issues

```bash
cd Source/KEV.Hackathon.AspireDemo.Web.React
rm -rf node_modules
npm install
```

### Port conflicts

If you encounter port conflicts, check for other applications using ports 5173, 45173, or 7065.

## Additional Resources

- [.NET Aspire Documentation](https://learn.microsoft.com/en-us/dotnet/aspire/)
- [Azure CLI Documentation](https://learn.microsoft.com/en-us/cli/azure/)
