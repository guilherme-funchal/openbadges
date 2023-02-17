import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { Form, Button, Col, Modal } from "react-bootstrap";
import Api from '../../Api';
import Swal from 'sweetalert2';
import { Controller, useForm } from "react-hook-form";
// import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function ModalEditClass(props) {
    const form = useRef(null);
    const [file, setFile] = useState("empty");
    const [value, setValues] = useState("");


    let name = props.items[0]?.name;
    let description = props.items[0]?.description;
    let criteriaUrl = props.items[0]?.criteriaUrl;
    let criteriaNarrative = props.items[0]?.criteriaNarrative;
    let alignmentsTargetName = props.items[0]?.alignmentsTargetName;
    let alignmentsTargetUrl = props.items[0]?.alignmentsTargetUrl;
    let alignmentsTargetDescription = props.items[0]?.alignmentsTargetDescription;
    let alignmentsTargetFramework = props.items[0]?.alignmentsTargetFramework;
    let alignmentsTargetCode = props.items[0]?.alignmentsTargetCode;
    let tags = props.items[0]?.tags;
    let expiresAmount = props.items[0]?.expiresAmount;
    let expiresDuration = props.items[0]?.expiresDuration;

    useEffect(() => {

    }, [])

    console.log("Props ->", props);

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-right',
        iconColor: 'green',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
    });

    var profile = "";
    var type = "";

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            createdBy: "",
            issuerId: "",
            name: "",
            image: "",
            description: "",
            criteriaUrl: "",
            criteriaNarrative: "",
            alignmentsTargetName: "",
            alignmentsTargetUrl: "",
            alignmentsTargetDescription: "",
            alignmentsTargetFramework: "",
            alignmentsTargetCode: "",
            tags: "",
            expiresAmount: "",
            expiresDuration: ""
        },
    });

    async function submitForm() {
        let block = {
            "id": props.items[0]?.id,
            "name": name,
            "description": description,
            "criteriaUrl": criteriaUrl,
            "criteriaNarrative": criteriaNarrative,
            "alignmentsTargetName": alignmentsTargetName,
            "alignmentsTargetUrl": alignmentsTargetUrl,
            "alignmentsTargetDescription": alignmentsTargetDescription,
            "alignmentsTargetFramework": alignmentsTargetFramework,
            "alignmentsTargetCode": alignmentsTargetCode,
            "tags": tags,
            "expiresAmount": expiresAmount,
            "expiresDuration": expiresDuration
        };

        console.log("Block----------->", block)

        await Api.patch('badgeclass', block, props.header);

        await Toast.fire({
            icon: 'success',
            title: 'Classe atualizada'
        });

        props.onClose();
    }

    const style = { width: '45px' }

    return ReactDOM.createPortal(
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
            <div className="modal">
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h4 className="modal-title">Editar Emissor</h4>
                    </div>
                    <div className="modal-body">
                        <form ref={form} noValidate onSubmit={handleSubmit(submitForm)}>
                            <Tabs
                                defaultActiveKey="1"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                            >

                                <Tab eventKey="1" title="Básico">

                                    <div>
                                        <Form.Group as={Col} md="20" controlId="validationCustom01">
                                            <Form.Label>Nome</Form.Label>
                                                  <Form.Control
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        placeholder="Nome"
                                                        defaultValue={props.items[0]?.name}
                                                        onChange={(e) => name = e.target.value}
                                                    />
                                            
                                        </Form.Group>
                                        <br></br>

                                        <Form.Group as={Col} md="20" controlId="validationCustom01">
                                            <Form.Label>Descrição</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                size="sm"
                                                rows={3}
                                                id="description"
                                                name="description"
                                                placeholder="Descrição"
                                                defaultValue={props.items[0]?.description}
                                                onChange={(e) => description = e.target.value}
                                            />
                                        </Form.Group>
                                        <br></br>

                                        <Form.Group as={Col} md="20" controlId="validationCustom01">
                                            <Form.Label>Url</Form.Label>

                                            <Form.Control
                                                type="text"
                                                id="criteriaUrl"
                                                name="criteriaUrl"
                                                placeholder="Url"
                                                defaultValue={props.items[0]?.criteriaUrl}
                                                onChange={(e) => criteriaUrl = e.target.value}
                                            />
                                        </Form.Group>
                                        <br></br>

                                        <Form.Group as={Col} md="20" controlId="validationCustom01">
                                            <Form.Label>Narrativa do critério</Form.Label>

                                            <Form.Control
                                                as="textarea"
                                                size="sm"
                                                rows={3}
                                                id="criteriaNarrative"
                                                name="criteriaNarrative"
                                                placeholder="Narrativa do critério"
                                                defaultValue={props.items[0]?.criteriaNarrative}
                                                onChange={(e) => criteriaNarrative = e.target.value}
                                            />
                                        </Form.Group>
                                        <br></br>
                                        <Form.Group as={Col} md="20" controlId="validationCustom01">
                                            <Form.Label>Tags</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="tags"
                                                name="tags"
                                                placeholder="Tags"
                                                defaultValue={props.items[0]?.tags}
                                                onChange={(e) => tags = e.target.value}
                                            />

                                        </Form.Group>
                                        <br></br>
                                        </div>

                                </Tab>
                                <Tab eventKey="2" title="Expiração">

                                    <div>
                                        <Form.Group as={Col} md="20" controlId="validationCustom01">
                                            <Form.Label>Tempo de expiração</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="expiresAmount"
                                                name="expiresAmount"
                                                placeholder="Tempo de expiração"
                                                defaultValue={props.items[0]?.expiresAmount}
                                                onChange={(e) => expiresAmount = e.target.value}
                                            />

                                        </Form.Group>
                                        <br></br>
                                        <Form.Group as={Col} md="20" controlId="validationCustom01">
                                            <Form.Label>Tempo de duração</Form.Label>

                                            <Form.Control
                                                type="text"
                                                id="expiresDuration"
                                                name="expiresDuration"
                                                placeholder="Tempo de duração"
                                                defaultValue={props.items[0]?.expiresDuration}
                                                onChange={(e) => expiresDuration = e.target.value}
                                            />

                                        </Form.Group>
                                        <br></br>
                                    </div>

                                </Tab>
                                <Tab eventKey="3" title="Alinhamento">
                                    <Form.Group as={Col} md="20" controlId="validationCustom01">
                                        <Form.Label>Nome do alinhamento</Form.Label>

                                        <Form.Control
                                            type="text"
                                            id="alignmentsTargetName"
                                            name="alignmentsTargetName"
                                            placeholder="Nome do alinhamento"
                                            defaultValue={props.items[0]?.alignmentsTargetName}
                                            onChange={(e) => alignmentsTargetName = e.target.value}
                                        />

                                    </Form.Group>
                                    <br></br>
                                    <Form.Group as={Col} md="20" controlId="validationCustom01">
                                        <Form.Label>Framework</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="alignmentsTargetFramework"
                                            name="alignmentsTargetFramework"
                                            placeholder="Framework"
                                            defaultValue={props.items[0]?.alignmentsTargetFramework}
                                            onChange={(e) => alignmentsTargetFramework = e.target.value}
                                        />
                                    </Form.Group>
                                    <br></br>
                                    <Form.Group as={Col} md="20" controlId="validationCustom01">
                                        <Form.Label>Código</Form.Label>

                                        <Form.Control
                                            type="text"
                                            id="alignmentsTargetCode"
                                            name="alignmentsTargetCode"
                                            placeholder="Código"
                                            defaultValue={props.items[0]?.alignmentsTargetCode}
                                            onChange={(e) => alignmentsTargetCode = e.target.value}
                                        />

                                    </Form.Group>
                                    <br></br>
                                    <Form.Group as={Col} md="20" controlId="validationCustom01">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="alignmentsTargetDescription"
                                            name="alignmentsTargetDescription"
                                            placeholder="Descrição"
                                            defaultValue={props.items[0]?.alignmentsTargetDescription}
                                            onChange={(e) => alignmentsTargetDescription = e.target.value}
                                        />
                                    </Form.Group>
                                    <br></br>
                                    <Form.Group as={Col} md="20" controlId="validationCustom01">
                                        <Form.Label>URL</Form.Label>

                                        <Form.Control
                                            type="text"
                                            id="alignmentsTargetUrl"
                                            name="alignmentsTargetUrl"
                                            placeholder="URL"
                                            defaultValue={props.items[0]?.alignmentsTargetUrl}
                                            onChange={(e) => alignmentsTargetUrl = e.target.value}
                                        />
                                    </Form.Group>
                                    <br></br>
                                </Tab>

                            </Tabs>
                            <div className="text-right">
                                <Button variant="danger" style={style} onClick={props.onClose} size="sm">
                                    <i class="fas fa-ban"></i>
                                </Button>
                                <Button variant="primary" style={style} type="submit" size="sm">
                                    <i class="fas fa-check"></i>
                                </Button>
                            </div>
                        </form>
                    </div>


                    <div className="modal-footer">
                    </div>
                </div>

            </div>
        </CSSTransition>,
        document.getElementById("root")
    );
};

export default ModalEditClass;