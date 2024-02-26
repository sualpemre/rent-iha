
import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { Card } from 'primereact/card';
import { DataScroller } from 'primereact/datascroller';
import { IhaService, DeleteIha, SetAircraft } from '../../../services/aircraft';
import { Button } from 'primereact/button';
import { toast } from 'react-toastify';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';

const ListIha = () => {

    const [ihaList, setihaList] = useState([]);

    const setIha = () => {
        IhaService().then(response => setihaList(response.data))
    }
    useEffect(() => {
        setIha();
    }, []);
    const deleteIha = (aircraft_id: number) => {
        DeleteIha(aircraft_id).then(response => {
            setIha();
            toast.success("İha başarılı bir şekilde silindi");
        })

    }

    const setStock = (e: any, aircraft: any) => {
        aircraft.stock_count = e.target.value;
        SetAircraft(aircraft).then(response => {
            setIha();
            toast.success("Stock bilgisi başarılı bir şekilde güncellendi");
        })
    }


    const updateStatusIha = (e: any, aircraft: any) => {
        aircraft.is_active = !e.target.value;
        console.log(e.target.value)
        SetAircraft(aircraft).then(response => {
            setIha();
            toast.success("Durum bilgisi başarılı bir şekilde güncellendi");
        })
    }
    const ihaTemplate = (iha) => {
        return (
            <div className="flex-initial shrink-0 w-full">
                <div className="flex flex-col xl:flex-row xl:items-start p-4 gap-4 bg-white dark:bg-gray-900">
                    <div className="flex flex-col sm:flex-row justify-between items-center xl:items-start flex-1 gap-4">
                        <div className="flex flex-col items-center sm:items-start gap-3">
                            <div className="text-2xl font-bold text-gray-700 dark:text-white/80">
                                {iha.aircraft_name}
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-2">
                                    <i className="pi pi-tag text-gray-700 dark:text-white/80"></i>
                                    <span className="font-semibold text-gray-700 dark:text-white/80">
                                        {iha.aircraft_description}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="flex align-items-center">
                            <RadioButton type="radio" inputId={iha.id} value={iha.is_active} style={{ border: '1px solid black' }}  onClick={(e) => updateStatusIha(e, iha)} checked={iha.is_active} />
                            <label htmlFor={iha.id} className="ml-2">{iha.is_active ? 'Aktif' : 'Pasif'}</label>
                        </div>
                        Stok: 
                        <InputText value={iha.stock_count} onChange={(e) => setStock(e, iha)} style={{border: '1px solid black'}} />
                        <Button icon="pi pi-times" severity="danger" aria-label="Cancel" onClick={() => {
                            deleteIha(iha.id)
                        }} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout>
            <Card>
                <DataScroller value={ihaList} itemTemplate={ihaTemplate} rows={5} inline scrollHeight="500px" />
            </Card>
        </AdminLayout>
    )
}




export default ListIha;