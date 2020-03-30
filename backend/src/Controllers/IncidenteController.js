const connection = require('../database/connection');

module.exports = {

    async index(request, response){

        const { page = 1 } = request.query;
        
        const [count] = await connection('incidentes')
        .count();

        const incidentes = await connection('incidentes')
        .join('ongs', 'ong_id', '=', 'incidentes.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidentes.*', 
        'ongs.nome', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.cidade', 
        'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidentes);
    },

    async create(request, response){
        
        const {titulo, descricao, orcamento} = request.body;

        const ong_id = request.headers.authorization;
        
        const [id] = await connection('incidentes').insert({
            titulo, 
            descricao, 
            orcamento, 
            ong_id
        });

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incidente = await connection('incidentes')
        .where('id', id)
        .select('ong_id')
        .first();

        if(incidente.ong_id != ong_id){
            return response.status(401).json({error: 'Operação não permitida'});
        }

        await connection('incidentes').where('id', id).delete();
        return response.status(204).send();
    }

}