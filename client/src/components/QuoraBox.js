import React, { useState } from 'react'
import { Avatar, Button,Input } from '@material-ui/core'
import './css/QuoraBox.css'
import "./css/QuoraHeader.css";
import { selectUser } from "../feature/userSlice";
import { useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import {
    AssignmentTurnedInOutlined,
    // Close,
    NotificationsOutlined,
    PeopleAltOutlined,
    Search,
    ExpandMore,
} from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

const QuoraBox = () => {
    const [isModalOpen, setIsModalOpen] = useState("");
    const [inputUrl, setInputUrl] = useState("");
    const [question, setQuestion] = useState("");

    const Close = (<CloseIcon />)
    const user = useSelector(selectUser);

    const handleSubmit = async () => {
        if (question !== "") {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = {
                questionName: question,
                questionUrl: inputUrl,
                user: user,
            };
            await axios
                .post("/api/questions", body, config)
                .then((res) => {
                    console.log(res.data);
                    alert(res.data.message);
                    window.location.href = "/";
                })
                .catch((e) => {
                    console.log(e);
                    alert("Error in adding question");
                });
        }
    };

    return (
        <div className ="quoraBox">
            <div className="quoraBox__info">
                <Avatar src={user?.photo}/>
            </div>
            <div className="quoraBox__quora">
                <button onClick={() => setIsModalOpen(true)} className="qouraBox__btn">What do you want to ask or share?</button>
                <Modal
                        open={isModalOpen}
                        closeIcon={Close}
                        onClose={() => setIsModalOpen(false)}
                        closeOnEscape={true}
                        centered={true}
                        closeOnOverlayClick={false}
                        styles={{
                            overlay: {
                                height: "auto",
                            },
                        }}
                    >
                        <div className="modal__title">
                            <h5>Add Questions</h5>
                        </div>
                        <div className="modal__info">
                            <Avatar src={user?.photo} />
                            <div className="modal__scope">
                                <PeopleAltOutlined />
                                <p>Public</p>
                                <ExpandMore />
                            </div>
                        </div>
                        <div className="modal__Field">
                            <Input
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                type="text"
                                placeholder="Start your question with 'What', 'How', 'Why', etc.." />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                <input
                                    type="text"
                                    value={inputUrl}
                                    onChange={(e) => setInputUrl(e.target.value)}
                                    style={{
                                        margin: "5px 0px",
                                        border: "1px solid lightgray",
                                        padding: "10px",
                                        outline: "2px solid black",

                                    }} placeholder="Optional: include a link that gives context"

                                />
                                {
                                    inputUrl !== "" && <img
                                        style={{
                                            padding: "10px",
                                            height: "30vh",
                                            objectFit: "contain",
                                        }} src={inputUrl} alt="displayimage" />
                                }
                            </div>
                        </div>
                        <div className="modal__button">
                            <button className="cancel" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="add">Add Question</button>
                        </div>
                    </Modal>
            </div>
        </div>
    )
}

export default QuoraBox