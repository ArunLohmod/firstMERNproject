import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const About = () => {
    const history = useHistory();

    const [user, setUser] = useState("");

    const getValue = async () => {

        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json()
            console.log(data);

            if (!data) {
                const error = new Error(res.error);
                throw error;
            }

            else if (data) { setUser(data); }

        } catch (error) {
            console.log(error);
            history.push('/login');
        }

    };

    useEffect(() => {
        getValue();
    }, [])


    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-12 mx-auto">
                        <div className="about">
                            <h2>About Me</h2>

                            <div className="aboutStyling">
                                <div className="row">
                                    <div className="col-md-4 que">
                                        <ul>
                                            <li>
                                                Name
                                            </li>
                                            <li>
                                                Work
                                            </li> <li>
                                                Email
                                            </li> <li>
                                                Phone
                                            </li> 
                                        </ul>
                                    </div>

                                    <div className="col-md-4">
                                        <ul>
                                            <li>
                                               {user.name}
                                            </li>
                                            <li>
                                                {user.work}
                                            </li> <li>
                                               {user.email}
                                            </li> <li>
                                                {user.phone}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

export default About
