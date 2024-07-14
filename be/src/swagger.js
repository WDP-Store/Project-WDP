import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import yaml from 'yamljs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Obtain the absolute file path
const fileAbsolutePath = path.resolve(__dirname, 'api.yaml');

const swaggerJsDocs = yaml.load(fileAbsolutePath);
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WDP Store API',
            description: "API endpoints documented on swagger",
            contact: {
                name: "Nguyễn Quang Minh",
                email: "minhnguyenhhhhn@gmail.com",
                url: "https://github.com"
            },
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:9999/",
                description: "Local server"
            },
            {
                url: "sdn-store.netlify.app",
                description: "Live server"
            },
        ]
    },
    // looks for configuration in specified directories
    apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, port) {
    // Swagger Page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDocs, options))
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}

export default swaggerDocs