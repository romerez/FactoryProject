import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import TextSelect from './TextSelect'
import { addWorker, getAllWorkers, handCheck } from '../services/workers';
import { JobTitle } from '../enums/JobTitle';
function Home() {
    const [worker, setWorker] = useState({
        firstName: { value: "", isValid: false },
        lastName: { value: "", isValid: false },
        job: { value: "", isValid: false },
        age: { value: "", isValid: false }
    });
    const [workersList, setWorkersList] = useState([]);
    const onChange = (propName, value, isValid) => {
        worker[propName].value = value;
        worker[propName].isValid = isValid;

        setWorker(worker);
    }

    function calculateAge(dateString) {
        const birthDate = new Date(dateString);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        // Adjust the age if the birthdate hasn't occurred yet in the current year
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    const checkText = (value) => {
        return value !== null && value !== undefined && value.length >= 2;
    }
    const checkDate = (value) => {
        return value !== null && value !== undefined
    }

    const onSubmit = (value) => {
        const isAllValid = Object.values(worker).every(item => item.isValid)
        if (isAllValid) {
            addWorker(worker);
            console.log("Sent API worker")
            console.log(worker)
        }
    }
    const onGetAllWorkers = async () => {
        const allWorkers = await getAllWorkers();
        setWorkersList(allWorkers);
    }
    const jobOptions = Object.keys(JobTitle)
    return (
        <div>
            <TextInput text="First Name" value={worker.firstName.value} type="text" propName="firstName" checkValid={checkText} onChange={onChange}></TextInput>
            <TextInput text="Last Name" value={worker.lastName.value} type="text" propName="lastName" checkValid={checkText} onChange={onChange}></TextInput>
            <TextInput text="Age" value={worker.age.value} type="Date" propName="age" checkValid={checkDate} onChange={onChange}></TextInput>
            <TextSelect text="Job" value={worker.job.value} options={jobOptions} propName="job" checkValid={checkDate} onChange={onChange}></TextSelect>
            <input type="button" value="Submit" onClick={onSubmit}></input>
            <input type="button" value="Show All Workers" onClick={onGetAllWorkers}></input>
            {!!workersList && (
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Job</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workersList.map(workerItem => (
                            <tr key={workerItem.id}>
                                <td>{workerItem.firstName}</td>
                                <td>{workerItem.lastName}</td>
                                <td>{calculateAge(workerItem.age)}</td>
                                <td>{Object.keys(JobTitle)[workerItem.job]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Home;