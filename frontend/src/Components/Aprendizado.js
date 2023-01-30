import React, { useState } from "react";
import Header from './Header';
import { Form, Button, Row, Col } from "react-bootstrap";
import Modal1 from "./Modals/Modal1"

export default function Aprendizado() {

    const [showModal1, setShowModal1] = useState(false);

    const style = { width: '85px' }

    return (
        <div>
            <Header />
            <div className="container">
                <h1>Aprendizado</h1>
            </div>
            <div className="container">
                <div className="card">
                    <div>
                        <div className="card-header">
                            <h3 className="card-title"></h3>
                            <div className="card-tools">
                            </div>
                        </div>
                        <div className="card-body table-responsive p-0">
                        <dev><center>Usuário sem badge</center></dev>
                        <button onClick={() => setShowModal1(true)}>Show Modal 1</button>
                        </div>
                    </div>

                </div>
            </div>
            <Modal1 title="My Modal1" name="teste" onClose={() => setShowModal1(false)} show={showModal1}>
      </Modal1>
            </div>
            )
}