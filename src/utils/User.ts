import api from '../axios/Api';

export const deleteUserAccount = async (password: string): Promise<boolean> => {
    return api.delete('/users/deleteAccount', { data: { password }, headers: { 'Content-Type': 'application/json' } } as any)
        .then(() => true)
        .catch(() => false);
};