import React, { Component } from "react";

export default class SignUp extends Component {
    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Nomor KTP</label>
                    <input type="number" className="form-control" placeholder="Masukkan Nomor KTP" />
                </div>

                <div className="form-group">
                    <label>Nama Lengkap</label>
                    <input type="text" className="form-control" placeholder="Masukkan Nama Lengkap" />
                </div>

                <div className="form-group">
                    <label>Nomor Handphone</label>
                    <input type="text" className="form-control" placeholder="Masukkan Nomor Handphone" />
                </div>

                <div className="form-group">
                    <label>Username (Email)</label>
                    <input type="email" className="form-control" placeholder="Masukkan Email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Masukkan Password" />
                </div>
                
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="login.components.js">sign in?</a>
                </p>
            </form>
        );
    }
}