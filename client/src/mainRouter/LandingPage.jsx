import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import axios from "axios"
import Autocomplete from '@mui/material/Autocomplete';
import InternshipCard from '../components/InternshipCard';
const LandingPage = ({setloading}) => {

    const [skills, setskills] = useState([]);
    const [location, setlocation] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedexperience, setselectedexperience] = useState("");
    const [selectedLocation, setselectedlocation] = useState("");
    const [internships, setinternships] = useState([]);
    const API_URL = import.meta.env.VITE_SERVER_URL


    const experience = [
        "Fresher",
        "6 Months",
        "1 Year",
        "2 Years",
        "3+ Years"
    ]

    const fetchskills = async (string) => {
        await axios.get(`https://api.apilayer.com/skills?q=${string}`, {
            headers: {
                apikey: "EZWLjd3EYj39qTBHXtpWBYeeVQ16ojlD"
            }
        })
            .then(res => {
                setskills(res.data)
            }).catch(err => {
                console.error(err)
            })


    }

    const fetchlocation = async () => {
        await axios.get("https://raw.githubusercontent.com/iaseth/data-for-india/master/data/readable/districts.json")
            .then(res => {
                setlocation(res.data.districts.map((el, ind) => el.district))

            }).catch(err => {
                console.error(err)
            })
    }

    useEffect(() => {
        fetchlocation();
    }, [])

    const hanndleSubmit = async () => {
        if (selectedSkills && selectedexperience && selectedLocation) {
            setloading(true);
            const details = {
                skills: selectedSkills,
                experience: selectedexperience,
                location: selectedLocation
            }

            await axios.post(API_URL + "/data/getrecommendation", details)
                .then(res => {
                    setinternships(res.data.internships);
                    setloading(false);
        })
                .catch(err => console.error(err))

        } else {
            alert("Enter all the Details")
        }
    }


    return (
        <main className='h-[91.2%] relative  grid place-items-center  bg-black'>

            <div className='relative text-white h-[100vh] p-10  flex-col z-99 flex justify-center gap-6'>
                <h1 className='text-6xl font-bold text-center text-white'>Shape Your Future With <br /> <span className='text-[#ff7500]'> PM Internship Portal</span></h1>
                <div className='flex flex-col gap-6'>
                    <div className='flex gap-2'>
                        <Autocomplete
                            multiple
                            value={selectedSkills}
                            onChange={(event, newValue) => setSelectedSkills(newValue)}
                            onInputChange={(e) => { e.target.value != "" && fetchskills(e.target.value) }}
                            limitTags={5}
                            id="multiple-limit-tags"
                            options={skills}
                            className='bg-white rounded-md w-full'
                            getOptionLabel={(option) => option}

                            renderInput={(params) => (
                                <TextField {...params} label="Skills" />
                            )}

                        />

                    </div>
                    <div className='flex gap-4 max-md:flex-col'>
                        <Autocomplete
                            disablePortal
                            options={experience}
                            value={selectedexperience}
                            onChange={(event, newValue) => setselectedexperience(newValue)}
                            className='bg-white rounded-md flex-1'
                            renderInput={(params) => <TextField {...params} label="Experience" />}
                        />
                        <select  onChange={(e) => { setselectedlocation(e.target.value) }} className='flex-1 bg-white py-4 text-gray-700 rounded-md p-2 outline-none '>
                            <option value="">Select Location</option>
                            {location.map((el, ind) => {
                                return <option key={ind} value={el}>{el}</option>
                            })}
                        </select>
                        <button onClick={() => hanndleSubmit()} className='flex-1 py-4 bg-[#ff7500] rounded-md text-xl font-semibold cursor-pointer'>Search</button>
                    </div>
                </div>

            </div>
            
            <section className='grid p-10  grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-8'>

                
                {
                    internships && internships.map((el, ind) => {
                        return <InternshipCard data={el} key={ind + 1} />
                    })
                }

            </section>

            <img className='absolute top-0 w-full h-full opacity-30' src="https://cdn.pixabay.com/photo/2016/11/21/16/27/laptop-1846277_1280.jpg" alt="" />


        </main>
    )
}

export default LandingPage