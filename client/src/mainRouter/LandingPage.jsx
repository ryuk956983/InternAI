
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import axios from "axios"
import Autocomplete from '@mui/material/Autocomplete';

import InternshipCard from '../components/InternshipCard';

const LandingPage = ({ setloading }) => {

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


    const fetchlocation = async () => {
        await axios.get("/files/location.json")
            .then(res => setlocation(res.data))
            .catch(err => alert(err.message));
    }

    const fetchskills = async () => {
        await axios.get('/files/skills.json')
            .then(res => setskills(res.data))
            .catch(err => alert(err.message));
    }

    useEffect(() => {
        fetchskills();
        fetchlocation();

    }, [])



    const hanndleSubmit = async () => {
        if (selectedSkills && selectedexperience && selectedLocation) {
            setloading(true);
            const details = {
                skills: [selectedSkills.map(el=> el.skill)],
                experience: selectedexperience,
                location: selectedLocation
            }
            

            await axios.post(API_URL + "/data/getrecommendation", details)
                .then(res => {
                    if (res.data.internships.length == 0) {
                        alert("No Internship found with this location")
                    } else {
                        setinternships(res.data.internships);

                    }
                    setloading(false);


                })
                .catch(err =>alert(err.message))

        } else {
            alert("Enter all the Details")
        }
    }


    return (
        <main className='h-[91.2%]  relative  grid place-items-center  bg-black'>

            <div className='relative text-white h-full p-10  flex-col z-99 flex justify-center gap-6'>
                <h1 className='text-6xl max-md:text-4xl font-bold text-center text-white'>Shape Your Future With <br /> <span className='text-[#ff7500]'> PM Internship Portal</span></h1>
                <div className='flex flex-col gap-6'>
                    <div className='flex gap-2'>
                        <Autocomplete
                            multiple
                            value={selectedSkills}
                            onChange={(event, newValue) => setSelectedSkills(newValue)}
                            limitTags={5}
                            id="multiple-limit-tags"
                            options={skills}
                            className='bg-white rounded-md w-full'
                            getOptionLabel={(option) => option.skill}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
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
                        />{location &&
                            <Autocomplete

                                options={location}
                                getOptionLabel={(option) => option?.city || ""}

                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onChange={(event, newValue) => setselectedlocation(newValue.city)}
                                className='bg-white rounded-md flex-1'
                                renderInput={(params) => <TextField {...params} label="Location" />}
                            />}
                        <button onClick={() => hanndleSubmit()} className='flex-1 py-4 bg-[#ff7500] rounded-md text-xl font-semibold cursor-pointer'>Search</button>
                    </div>
                </div>

            </div>
            <img className='absolute top-0 w-full h-full opacity-30' src="https://cdn.pixabay.com/photo/2016/11/21/16/27/laptop-1846277_1280.jpg" alt="" />
            {internships && <section className='grid p-10 max-sm:mt-34 mt-60 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-8 max-sm:p-4'>


                {
                    internships.map((el, ind) => {
                        return <InternshipCard data={el} key={ind + 1} />
                    })
                }

            </section>}
        </main>
    )
}

export default LandingPage