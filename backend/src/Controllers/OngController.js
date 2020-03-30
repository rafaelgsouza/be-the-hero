const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        
        const ongs = await connection('ongs').select('*');
        
        return response.json(ongs);
    },
    
    async create(request, response){
        
        const {nome, email, whatsapp, cidade, uf} = request.body;

        /** Cria um id de modo Randômico */
        const id = crypto.randomBytes(4).toString('HEX');

        /** Cadastra a ong na tabela ongs */
        await connection('ongs').insert({ 
            id, 
            nome, 
            email, 
            whatsapp, 
            cidade, 
            uf 
        });

        return response.json({ id });
    }  
}