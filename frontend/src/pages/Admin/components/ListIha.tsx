
import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { Card } from 'primereact/card';
import { DataScroller } from 'primereact/datascroller';
import { IhaService, DeleteIha, SetAircraft, CreateIha, FilterAircraft } from '../../../services/aircraft';
import { toast } from 'react-toastify';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';


type formDataType = {
    aircraft_name: string;
    aircraft_description: string;
    stock_count: number;
}



const ListIha = () => {

    const [ihaList, setihaList] = useState([]);
    const [formData, setFormData] = useState<formDataType | null>(null)
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name !== undefined && value !== undefined) {
            const newFormData: formDataType = { ...formData, [name as string]: value as string };
            setFormData(newFormData);
        }
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        CreateIha(formData).then(response => {
            if (response.status === 201) {
                setIha();
                toast.success("İha başarılı bir şekilde kaydedildi");
            }
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
        aircraft.is_active = e;
        SetAircraft(aircraft).then(response => {
            setIha();
            toast.success("Durum bilgisi başarılı bir şekilde güncellendi");
        })
    }

    const searchIha = (e: any) => {
        FilterAircraft(e.target.value).then(response => {
            setihaList(response.data)
        })
    }
    const ihaTemplate = (iha: any) => {
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

                            <div x-data="{ switcherToggle: false }">
                                <label
                                    htmlFor={iha.id}
                                    className="flex cursor-pointer select-none items-center"
                                >
                                    <div className="relative">
                                        <input
                                            id={iha.id}
                                            type="checkbox"
                                            className="sr-only"
                                            onChange={() => {
                                                updateStatusIha(!iha.is_active, iha);
                                            }}
                                        />
                                        <div className="h-5 w-14 rounded-full bg-meta-9 shadow-inner dark:bg-[#5A616B]"></div>
                                        <div
                                            className={`dot absolute left-0 -top-1 h-7 w-7 rounded-full bg-white shadow-switch-1 transition ${iha.is_active && '!right-0 !translate-x-full !bg-primary dark:!bg-white'
                                                }`}
                                        ></div>
                                    </div>
                                </label>
                            </div>
                  
                        </div>
                        <label className="mb-3 block text-black dark:text-white">
                            Stok:
                        </label>
                        <input
                            id={iha.id}
                            type="number"
                            className="w-10 rounded-lg border-[1.5px] border-stroke bg-transparent p2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={iha.stock_count} onChange={(e) => setStock(e, iha)}
                        />
                        <button
                            onClick={() => {
                                deleteIha(iha.id)
                            }}
                            className="inline-flex items-center justify-center gap-2.5 bg-danger p-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            <span>
                                <svg fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    width="16" height="16" viewBox="0 0 485 485" xml:space="preserve">
                                    <g>
                                        <g>
                                            <rect x="67.224" width="350.535" height="71.81" />
                                            <path d="M417.776,92.829H67.237V485h350.537V92.829H417.776z M165.402,431.447h-28.362V146.383h28.362V431.447z M256.689,431.447
			h-28.363V146.383h28.363V431.447z M347.97,431.447h-28.361V146.383h28.361V431.447z"/>
                                        </g>
                                    </g>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout>
            <Breadcrumb pageName="Iha Listesi" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Yeni İha Oluştur
                    </h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                İha İsmi
                            </label>
                            <input
                                type="text"
                                placeholder="İha İsmini Giriniz"
                                name="aircraft_name"
                                onChange={handleInputChange}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Stok Bilgisini Giriniz
                            </label>
                            <input
                                type="number"
                                placeholder="Stok Bilgisini Giriniz"
                                name="stock_count"
                                onChange={handleInputChange}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                İhanın Açıklaması
                            </label>
                            <textarea
                                rows={6}
                                placeholder="İha Açıklamasını Giriniz"
                                name="aircraft_description"
                                onChange={handleInputChange}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                        </div>
                        <button
                            type='submit'
                            className="float-right inline-flex items-center justify-center gap-2.5 bg-success p-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            <span>
                                <svg fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    width="16" height="16" viewBox="0 0 407.096 407.096"
                                    xml:space="preserve">
                                    <g>
                                        <g>
                                            <path d="M402.115,84.008L323.088,4.981C319.899,1.792,315.574,0,311.063,0H17.005C7.613,0,0,7.614,0,17.005v373.086
			c0,9.392,7.613,17.005,17.005,17.005h373.086c9.392,0,17.005-7.613,17.005-17.005V96.032
			C407.096,91.523,405.305,87.197,402.115,84.008z M300.664,163.567H67.129V38.862h233.535V163.567z"/>
                                            <path d="M214.051,148.16h43.08c3.131,0,5.668-2.538,5.668-5.669V59.584c0-3.13-2.537-5.668-5.668-5.668h-43.08
			c-3.131,0-5.668,2.538-5.668,5.668v82.907C208.383,145.622,210.92,148.16,214.051,148.16z"/>
                                        </g>
                                    </g>
                                </svg>
                            </span>
                            Kaydet
                        </button>
                    </div>
                </form>



            </div>
            <input
                type="text"
                placeholder="Iha Aramak için yazınız"
                onChange={(e)=>searchIha(e)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <Card>
                <DataScroller value={ihaList} itemTemplate={ihaTemplate} rows={5} inline scrollHeight="500px" />
            </Card>
        </AdminLayout>
    )
}




export default ListIha;