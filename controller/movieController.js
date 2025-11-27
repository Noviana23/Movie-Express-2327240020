import mongoose from "mongoose";
import MovieModel from "../models/movieModel.js";

export const movies = async (req, res) => {
    try {
        // Hanya menampilkan movie milik user yang sedang login 
        const movies = await MovieModel.find({
            createdBy : req.user?.user_id
        }).sort({ createdAt : -1 });

        return res.status(200).json({
            message : "Daftar semua movie",
            data : movies,
        });

    } catch (error) {
        return res.status(500).json ({
            message : "Terjadi kesalahan pada server",
            error : error.message,
            data : null,
        });
    }
};

export const addNewMovie = async (req, res) => {
    try {
        const { judul, tahunRilis, sutradara} = req.body;

        if (!judul || !tahunRilis || !sutradara){
            return res.status(400).json({
                message : "Semua field (judul, tahunRilis, sutradara) wajib diisi",
                data : null,
            });
        }

        //Menyimpan user_id pembuat ke database
        const movie = await MovieModel.create({judul, tahunRilis, sutradara, createdBy: req.user?.user_id});

        return res.status(201).json({
            message : "Berhasil menambahkan movie baru",
            data : null,
        });
    } catch (error) {
        return res.status(500).json({
            message : "Gagal menambahkan movie",
            error : error.message,
            data : null,
        })
    }
};

export const detailMovie = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ messange : "ID tidak valid", data : null });
        }

        //Mencari movie berdasarkan ID dan kepemilikan user 
        const movie = await MovieModel.findOne({
            _id : id,
            createdBy : req.user?.user_id,
        });

        if (!movie) {
            return res.status(404).json({ message : "Movie tidak ditemukan", data : null });
        }
    } catch (error) {
         return res.status(500).json({
            message : "Terjadi kesalahan pada server",
            error : error.message,
            data : null,
        });
    }
};

export const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, tahunRilis, sutradara } = req.body;

        if (!id || !monggose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message : "ID tidak valid", data : null,});
        }

        //Update hanya jikia ID cocok dan user pembuat cocok 
        const updateMovie = await MovieModel.findOneAndUpdate(
            {
                _id : id, 
                createdBy : req.user?.user_id,
            },
            {judul, tahunRilis, sutradara},
            {new : true},
        );

        if(!updateMovie) {
            return res.status(404).json ({ message : "Movie tidak ditemukkan atau akses ditolak", data : null});
        }
        
        return res.status(200).json({
            message : "Berhasil mengupdate movie",
            data : updateMovie,
        });
    }catch (error) {
        res.status(500).json({
            message : "Terjadi kesalahan pada server",
            error : error.message,
            data : null,
        });
    }
};

export const deleteMovie = async (req, res) => {
    try {
        const id = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message : "ID TIDAK VALID", data : null });
        }
        
        //Hapus hanya jika Id cocok dan user pembuat cocok
        const deleteMovie = await MovieModel.findOneAndUpdate({
            _id : id, 
            createdBy : req.user?.user_id,
        });

        if(!deleteMovie) {
            return res.status(404).json ({ message : "Movie tidak ditemukkan atau akses ditolak ", data : null });
        }
        return res.status(200).json ({
            message : "Berhasil menghapus movie",
            data : response,
        });
    }catch (error) {
        res.status(500).json({
            message : "Terjadi kesalahan pada server",
            error : error.message,
            data : null,
        });
    }
};
