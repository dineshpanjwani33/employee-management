import React, { useState, useContext, useEffect } from 'react';

import MainNavigation from '../../shared/components/Navigation/MainNavigation';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';

import EmployeeList from '../../employee/components/EmployeeList';
import NewEmployee from '../../employee/components/NewEmployee';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './Dashboard.scss';

/*
    Renders the main page after the successful authentication with 
    navigation, task button and employee list component 
*/
const Dashboard = (props) => {

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [showModal, setShowModal] = useState(false);
    const [loadedEmployees, setLoadedEmployees] = useState();
    const [responseMsg, setResponseMsg] = useState();
    const [reload, setReload] = useState(false);

    const modalHandler = () => {
        setShowModal(prevState => !prevState);
    }

    /* To change the reload state in order to fetch data 
        after updation and deletion of employee item   */
    const reloadHandler = () => {
        setReload(prevState => !prevState);
    }

    /* Fetching employees data using sendRequest function 
        returned by custom hook called useHttpClient() whenever any of the dependency changed */
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/employees`,
                    'GET',
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                );
                if (responseData.message) {
                    setResponseMsg(responseData.message);
                    setLoadedEmployees(undefined);
                }
                else {
                    setLoadedEmployees(responseData.employees);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchEmployees();
    }, [auth.token, sendRequest, reload])

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />

            {/* Adding modal with NewEmployee component 
                after clicking on AddEmployee button */}
            <Modal
                show={showModal}
                onCancel={modalHandler}
                header={"Create New Employee"}
                contentClass="modal-content"
                footerClass="modal-actions"
                footer={<Button danger onClick={modalHandler}>CLOSE</Button>}
            >
                <NewEmployee
                    onClick={modalHandler}
                    reloadEmployees={reloadHandler} />
            </Modal>

            <div className="container">

                {/* Renders navigation with logout button */}
                <MainNavigation />
                <Card className="emp-container">

                    <Button inverse onClick={modalHandler}>
                        <span className="fa fa-plus-circle"></span> Add Employee
                    </Button>

                    {/* Displaying Loading spinner while fetching data from database */}
                    {isLoading && <div className="center">
                        <LoadingSpinner asOverlay />
                    </div>}

                    {/* Displaying server response message */}
                    {!loadedEmployees && !error && <div className="center">
                        <span>{responseMsg}</span>
                    </div>}

                    {/* Renders the employee list component with table list */}
                    {!isLoading && loadedEmployees && <EmployeeList
                        employees={loadedEmployees}
                        reloadEmployees={reloadHandler}
                    />}
                </Card>
            </div>
        </React.Fragment>
    )
}

export default Dashboard;