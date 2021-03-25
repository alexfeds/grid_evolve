using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(grid_evolve.Startup))]
namespace grid_evolve
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
