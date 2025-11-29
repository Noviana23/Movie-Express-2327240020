import MovieModel from "../models/movieModel.js";


export const listMovie = async (req, res) => {
    try {
        const data = await MovieModel.find({});

        res.status(200).json({
            message : "Berhasil Mendapatkan List Movie",
            data : data,
        })
    }catch (error){
        res.status(500).json({
            message : error.message,
            data : null,
        })
    }
}

export const createNewMovie = async (req, res) => {
    try {
        const request = req.body

        const response = await MovieModel.create({
            judul : request.judul,
            tahunRilis : request.tahunRilis,
            sutradara : request.sutradara
        });

        res.status(201).json({
            message : "Movie Berhasil dibuat",
            data : response,
        })
    }catch (error){
        res.status(500).json({
            message : error.message,
            data : null,
        })
    }
}
export const UpdateMovie = async (req, res) => {
    try {
        const id = req.params?.id;
        const request = req.body;

        if (!id) {
            return res.status(400).json({
                message : "ID Movie Wajib diisi di Parameter URL",
                data : null,
            });
        }
        const response = await MovieModel.findByIdAndUpdate(id, request, {new : true});

        if(!response) {
            return res.status(404).json ({
                message : "Data Movie Tidak Ditemukan",
                data : null,
            });
        }
        
        return res.status(200).json({
            message : "Data Movie Berhasil Diupdate",
            data : message,
        });
    }catch (error) {
        res.status(500).json({
            message : error.message,
            data : null,
        });
    }
};

export const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                message : "ID Movie Wajib diisi di Parameter URL",
                data : null,
            });
        }
        const response = await MovieModel.findByIdAndUpdate(id);

        if(!response) {
            return res.status(404).json ({
                message : "Movie Tidak Ditemukan",
                data : null,
            });
        }
            return res.status(200).json ({
                message : "Movie Berhasil Dihapus",
                data : response,
            });
    }catch (error) {
        res.status(500).json({
            message : error.message,
            data : null,
        });
    }
};
