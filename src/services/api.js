import axios from "axios";




const token = localStorage.getItem("tokens");

const config = {
    headers: {
        auth_token: token,
    },
}


export const updateUserInfo = async (data) => {
    try {
        const userUpdate = await axios.put('/user/updateData', data, config);
        const userData = await axios.get('/user', config);
        console.log(userData, userUpdate);
        return {status: userUpdate.status };
       
    } catch (error) {
        console.log(error)
    }
};


export const deleteAcount = async () => {
    try {
        const userDelete = await axios.delete('/user', config);
        console.log(userDelete.status);
        return {status: userDelete.status};
    } catch (error) {
       console.log(error) 
    }
}


export const updateAdress = async (data) => {
    try {
        data = {address: data}
        const adressUpdate = await axios.put('/user/updateData', data, config);
        const adressData = await axios.get('/user', config);
        console.log(adressData, adressUpdate);
        return {status: adressUpdate.status };
       
    } catch (error) {
        console.log(error)
    }
};

export const getUserData = async () => {
    try {
        const userData = await axios.get('/user', config);
        console.log(userData);
        return userData.data;
    } catch (error) {
        console.log(error)
    }
};