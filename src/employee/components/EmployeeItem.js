import React, { useState, useContext } from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';

import UpdateEmployee from './UpdateEmployee';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const EmployeeItem = (props) => {

    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const { emp } = props;

    const modalHandler = () => {
        setShowModal(prevState => !prevState);
    }

    const confirmModalHandler = () => {
        setShowConfirmModal(prevState => !prevState);
    }

    const closeConfirmDeleteHandler = () => {
        setShowConfirmModal(false);
    }

    /* Deleting employee using sendRequest function 
        returned by custom hook called useHttpClient() */
    const confirmHanlder = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/employees/${emp.id}`,
                'DELETE',
                {
                    Authorization: 'Bearer ' + auth.token
                },
                null
            );
            props.reloadEmployees();
        } catch (err) {
            console.log(err);
        }
    }

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner asOverlay />
            </div>
        )
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />

            {/* Adding modal with Updateemployee component 
                after clicking on edit button */}
            <Modal
                show={showModal}
                onCancel={modalHandler}
                header={'E' + emp.empId}
                contentClass="modal-content"
                footerClass="modal-actions"
                footer={<Button danger onClick={modalHandler}>CLOSE</Button>}
            >
                <UpdateEmployee
                    employeeData={emp}
                    closeModal={modalHandler}
                    reloadEmployees={props.reloadEmployees} />

            </Modal>

            {/* Adding confirm modal for deleting employee 
                after clicking on delete button */}
            <Modal
                show={showConfirmModal}
                header="Are you sure?"
                onCancel={closeConfirmDeleteHandler}
                footerClass="modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={closeConfirmDeleteHandler}>CANCEL</Button> <Button
                            danger onClick={confirmHanlder}>PROCEED</Button>
                    </React.Fragment>
                }>
                <p>Do you want to proceed and delete this employee? Please note that it won't undone thereafter!</p>
            </Modal>

            {/* Rendering each row of employee data */}
            <tr>
                <td>{'E' + emp.empId}</td>
                <td>{emp.firstname}</td>
                <td>{emp.lastname}</td>
                <td>{emp.address}</td>
                <td>{new Date(emp.dob).toISOString().slice(0, 10)}</td>
                <td>{emp.mobile}</td>
                <td>{emp.city}</td>
                <td>
                    <div>
                        <Button inverse size="xs" edit onClick={modalHandler} ></Button> <Button
                            danger size="xs" delete onClick={confirmModalHandler}></Button>
                    </div>
                </td>
            </tr>
        </React.Fragment>
    )
};

export default EmployeeItem;