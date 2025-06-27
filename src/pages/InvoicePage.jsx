import { useNavigate } from "react-router-dom";
import "../css/InvoicePage.css";
import AddImage from "../assets/editIcon/AddImage.png";
import AddPlus from "../assets/editIcon/AddPlus.png";
import Delete from "../assets/editIcon/Close.png";
import StackViewerNavTab from "../components/stackViewerNavTab/StackViewerNavTab";
import { useState } from "react";

const InvoicePage = () => {

    const navigate = useNavigate();

    const [makerDetails, setMakerDetails] = useState([
        {label: "Your Company", value: "", type: "text", limit: 100},
        {label: "Your Name", value: "", type: "text", limit: 100},
        {label: "Company's GSTIN", value: "", type: "text", limit: 18},
        {label: "Company's Address", value: "", type: "text", limit: 300},
        {label: "City", value: "", type: "text", limit: 100},
        {label: "State", value: "", type: "text", limit: 100},
        {label: "Country", value: "", type: "text", limit: 100},
    ]);

    const [billerDetails, setBillerDetails] = useState([
        {label: "Bill To:", value: "Bill To:", type: "text", limit: 100},
        {label: "Your Client's Company", value: "", type: "text", limit: 100},
        {label: "Client's GSTIN", value: "", type: "text", limit: 18},
        {label: "Client's Address", value: "", type: "text", limit: 300},
        {label: "City", value: "", type: "text", limit: 100},
        {label: "State", value: "", type: "text", limit: 100},
        {label: "Country", value: "", type: "text", limit: 100},
    ]);

    const [invoiceDetails, setInvoiceDetails] = useState([
        {label: "ID#", value: "Invoice#", type: "text", limit: 100},
        {label: "INV-12", value: "", type: "text", limit: 100},
        {label: "Date", value: "Invoice Date", type: "text", limit: 100},
        {label: "Date", value: "", type: "date", limit: 100},
        {label: "Due Date", value: "Due Date", type: "text", limit: 100},
        {label: "Date", value: "", type: "date", limit: 100},
    ]);

    const [itemDetails, setItemDetails] = useState(
        [
            {tableRow: [
                {label: "Enter item name/description", value: "", type: "text", limit: 100},
                {label: "0.00", value: "", type: "number", limit: 100},
                {label: "0.00", value: "", type: "number", limit: 100},
                {label: "0.00", value: "", type: "number", limit: 100},
                {label: "0.00", value: "", type: "number", limit: 100},
                {label: "0.00", value: "", type: "number", limit: 100},
                {label: "0.00", value: "", type: "number", limit: 100},
                {value: "", type: "dropdown", data: ["HSN", "SAC"]},
            ]},
        ]
    );

    const handleAddRow = () => {
        setItemDetails((prev) => {
            return [...prev, 
            {tableRow: [
                {label: "Enter item name/description", value: "", type: "text", limit: 100},
                {label: "0.00", value: "", type: "number", limit: 100},
                {label: "0.00", value: "", type: "number", limit: 100},
                {label: "0.00", value: "", type: "number", limit: 100},
                {label: "0.00", value: "", type: "number", limit: 100},
                {label: "0.00", value: "", type: "number", limit: 100},
                {label: "0.00", value: "", type: "number", limit: 100},
                {value: "", type: "dropdown", data: ["HSN", "SAC"]},
            ]},
            ]
        })
    }

    const handleDeleteRow = (removeIndex) => {
        setItemDetails((prev) => {
            return [...prev].filter((data, index) => {
                if(index !== removeIndex){
                    return data;
                }
            })
        })
    }
console.log(itemDetails)
    const directBack = () => {
        navigate(-1);
    };

    const invoiceReload = () => {
        window.location.reload();
    }

  return (
    <main className='invoice-viewer-layout select-text-disable'>
        <nav className='invoice-viewer-layout-navbar'>
            <StackViewerNavTab navtablabel={{nav: "Back", reload: "Reload", containerTitle: "Tax Invoice Generator" }} StackViewerNavigator={directBack} StackViewerReloader={() => invoiceReload()} />
        </nav>
        <div className='invoice-viewer-layout-body App-custom-scroll-bar'>
            <section className="invoice-form-main-container">
            <article className="invoice-form-container">
                <section className="invoice-form-layout">
                    <div className="invoice-form-header">
                        <section className="invoice-form-header-logo">
                            <div className="invoice-form-header-logo-img">
                                <img src={AddImage} style={{width: "40px"}} alt="AddImage"/>
                                <span className="invoice-form-header-logo-label">Upload</span>
                            </div>
                            <div className="invoice-form-header-logo-info">
                                <span className="invoice-form-header-logo-info-label">Upload Logo</span>
                                <span className="invoice-form-header-logo-info-text">240 x 240 pixels @ 72 DPI, Maximum size of 1MB.</span>
                            </div>
                        </section>
                        <section className="invoice-form-header-title">
                            <article className="invoice-form-header-title-text-container">
                                <input className="invoice-form-header-title-text" placeholder="FORM TITLE" type="text" />
                            </article>
                        </section>
                    </div>
                    <div className="invoice-form-maker-info">
                        {makerDetails?.map((details, index) => {
                            return (<article className="maker-info-container" key={`maker-info` + index}>
                                        <input className="input-info-text" placeholder={details?.label} type={details?.type} maxLength={details?.limit} value={details?.value} />
                                    </article>)
                        })}
                    </div>
                    <div className="invoice-form-biller-container">
                        <div className="invoice-form-biller-info">
                            {billerDetails?.map((details, index) => {
                                return (<article className="biller-info-container" key={`maker-info` + index}>
                                            <input className="input-info-text" placeholder={details?.label} type={details?.type} maxLength={details?.limit} value={details?.value} />
                                        </article>)
                            })}
                        </div>
                        <div className="invoice-form-biller-info-date-container">
                            {invoiceDetails?.map((details, index) => {
                                return (<article className="invoicedate-info-container" key={`maker-info` + index}>
                                            <input className="invoice-input-info-text" placeholder={details?.label} type={details?.type} maxLength={details?.limit} value={details?.value} />
                                        </article>)
                            })}
                        </div>
                    </div>
                    <div className="place-of-supply-container">
                        <span className="place-of-supply-label">Place Of Supply:</span>
                        <article className="place-of-supply-info-container">
                            <input className="input-info-text" placeholder={"State"} type={"text"} maxLength={100} />
                        </article>
                    </div>
                    <div className="invoice-item-table-container">
                        <section className="invoice-item-table-header">
                            <div className="table-header-mainlabel-container">
                                <span className="table-header">Item Description</span>
                            </div>
                            <div className="table-header-label-container">
                                <span className="table-header">Qty</span>
                            </div>
                            <div className="table-header-label-container">
                                <span className="table-header">Rate</span>
                            </div>
                            <div className="table-header-label-container">
                                <span className="table-header">SGST</span>
                            </div>
                            <div className="table-header-label-container">
                                <span className="table-header">CGST</span>
                            </div>
                            <div className="table-header-label-container">
                                <span className="table-header">Cess</span>
                            </div>
                            <div className="table-header-label-container">
                                <span className="table-header">HSN/SAC</span>
                            </div>
                        </section>
                        {itemDetails?.map((rowDetails, index) => {
                            return (<>
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                <button className="delete-table-row-container" onClick={() => handleDeleteRow(index)}>
                                    <img src={Delete} alt="Delete" style={{width: "14px"}} />
                                </button>
                            </div>
                            <section className="invoice-item-table-data">
                                        {rowDetails?.tableRow?.map((details) => {
                                            if(details?.type === "number"){
                                                return (<div className="table-body-data-container">
                                                            <article className="table-body-data">
                                                                <input className="input-table-body-data" placeholder={details?.label} type={details?.type} maxLength={details?.limit} value={details?.value} />
                                                            </article>
                                                        </div>)
                                            } else if(details?.type === "text"){
                                                return (<div className="table-body-maindata-container">
                                                            <article className="table-body-maindata">
                                                                <textarea className="input-table-body-maindata" placeholder={details?.label} type={details?.type} maxLength={details?.limit} rows={3} value={details?.value} />
                                                            </article>
                                                        </div>)
                                            } else if(details?.type === "dropdown"){
                                                return (<div className="table-body-data-container">
                                                            <select value={details?.value} defaultChecked={""} className="table-body-data-dropdown">
                                                                <option value={""}>Otp</option>
                                                                {details?.data.map((dropdownvalues, index) => {
                                                                    return (<option value={dropdownvalues}>{dropdownvalues}</option>)
                                                                })}
                                                            </select>
                                                        </div>)
                                            }
                                        })}
                            </section></>)
                        })}
                    </div>
                    <button className="insert-table-row-container" onClick={() => {
                        handleAddRow()
                    }}>
                        <img src={AddPlus} alt="AddPlus" style={{width: "14px"}} />
                        <span>Add Line Item</span>
                    </button>
                    <div className="note-container">
                        <article className="note-info-container">
                            <input className="input-info-text" placeholder={"Notes"} type={"text"} maxLength={50} value={"Notes"} />
                        </article>
                        <article className="table-body-maindata">
                            <textarea className="input-table-body-maindata" placeholder={"It was great doing business with you."} type={"text"} maxLength={"300"} />
                        </article>
                    </div>
                    <div className="terms-conditions-container">
                        <article className="note-info-container">
                            <input className="input-info-text" placeholder={"Notes"} type={"text"} maxLength={50} value={"Notes"} />
                        </article>
                        <article className="table-body-maindata">
                            <textarea className="input-table-body-maindata" placeholder={"It was great doing business with you."} type={"text"} maxLength={"300"} />
                        </article>
                    </div>
                </section>
            </article>
            <article className="invoice-form-action-container">d</article>
            </section>
        </div>
    </main>
  )
}

export default InvoicePage;