
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const warningToaster = async (text: string) => {

    toast(text, {type:"warning", position:'bottom-right'});
}

export const successToaster = async (text: string) => {

    toast(text, {type:"success", position:'bottom-right'});
}

