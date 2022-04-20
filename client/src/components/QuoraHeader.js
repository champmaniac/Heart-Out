import React, { useState } from 'react'
import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import {
    AssignmentTurnedInOutlined,
    // Close,
    NotificationsOutlined,
    PeopleAltOutlined,
    Search,
    ExpandMore,
} from "@material-ui/icons";
import { Avatar, Button, Input } from "@material-ui/core";
import { Modal } from "react-responsive-modal";
import "./css/QuoraHeader.css";
import CloseIcon from "@material-ui/icons/Close";
import "react-responsive-modal/styles.css";
import axios from "axios";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { logout, selectUser } from "../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";

const QuoraHeader = () => {

    const [isModalOpen, setIsModalOpen] = useState("");
    const [inputUrl, setInputUrl] = useState("");
    const [question, setQuestion] = useState("");

    const Close = (<CloseIcon />)
    const dispatch = useDispatch();
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

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            signOut(auth)
                .then(() => {
                    dispatch(logout());
                    console.log("Logged out");
                })
                .catch(() => {
                    console.log("error in logout");
                });
        }
    };

    return (
        <div className="qHeader">
            <div className="qHeader-content">
                {/* <div className="qHeader-content__left">HeartOut</div> */}
                <div className="qHeader__logo">
                    <img src="https://qphs.fs.quoracdn.net/main-qimg-a2acef8d1334020f0153f839261f9f74" alt="Quora logo" />
                </div>
                <div className="qHeader__icons">
                    <div className="qHeader__icon" title="Home"><HomeIcon /></div>
                    <div className="qHeader__icon" title="Following"><FeaturedPlayListOutlinedIcon /></div>
                    <div className="qHeader__icon" title="Answer"><AssignmentTurnedInOutlined /></div>
                    <div className="qHeader__icon" title="Space"><PeopleAltOutlined /></div>
                    <div className="qHeader__icon" title="Notifications"><NotificationsOutlined /></div>
                </div>
                <div className="qHeader__input">
                    <Search />
                    <input type="text" placeholder="Search HeartOut.." />
                </div>
                <div className="qHeader__Rem">
                    <span onClick={handleLogout}><Avatar src={user?.photo}/></span>
                    <Button
                        className="qHeader__Rem-button" title='Create a post..'
                        onClick={() => setIsModalOpen(true)}>
                        Add Questions
                        <ExpandMore />
                    </Button>
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
        </div>
    )
}

export default QuoraHeader