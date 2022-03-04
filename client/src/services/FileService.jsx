import axiosService from './AxiosService';

class FileService {

    uploadFile(file) {
        const data = new FormData();
        data.append("file", file);
        return axiosService.getRestClient().post('/uploadImage', data)
    }

    deleteFile(fileName) {
        return axiosService.getRestClient().delete(`/deleteImage/${fileName}`)
    }

}
export default (new FileService());