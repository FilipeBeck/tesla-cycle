import 'vanilla-x/Object'
import http from 'http'
import path from 'path'
import { promises as fs } from 'fs'
import os from 'os'

const port = 3000
const indexPage = fs.readFile(path.join(__dirname, 'index.html'))
const clientScript = fs.readFile(path.join(__dirname, 'client.js'))
const netInterfaces = os.networkInterfaces()

const server = http.createServer(async (request, response) => {
	const url = request.url || ''

	if (url.endsWith('client.js')) {
		const scriptContent = await clientScript
		response.end(scriptContent)
	}
	else {
		const indexContent = await indexPage
		response.end(indexContent)
	}
})

server.on('listening', () => {
	console.log('Server listening in:')

	for (const [name, inters] of netInterfaces) {	
		for (const inter of inters) {
			if (inter.internal) {
				console.log(name, `http://${inter.address}:${port}`)
			}
		}
	}
})

server.listen(3000)