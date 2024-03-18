// next.config.mjs

export default {
    // Other Next.js configuration options...
    // Your other configuration settings
    
    // Configure static HTML export
    // You can customize these options based on your requirements
    exportPathMap: async function () {
      return {
        '/': { page: '/' },
        // Add other routes here if needed
      };
    },
  };
  