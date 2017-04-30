// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import CredentialsForm from './Home.css';
var Client = require('ssh2').Client;


class Home extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.goBack = this.goBack.bind(this);
    this.returnFalse = this.returnFalse.bind(this);
    this.dragDrop = this.dragDrop.bind(this);
    this.state = {'list': [], 'dir': ''};
  }
  render() {
    var self = this;
    return ( 
      <div>
        <div onClick={this.handleClick.bind(this)}>
          Test Button
        </div>
        <div onDragOver={this.returnFalse.bind(this)} onDragLeave={this.returnFalse.bind(this)} onDragEnd={this.returnFalse.bind(this)} onDrop={this.dragDrop.bind(this)} className={styles.editor}>
          <ul>
          {this.state.list.map(function(obj, i) {
              if (obj.attrs.mode == '16877') {
                return <li className={styles.clickable} onClick={(e) => self.changeDir(obj.filename)} key={i}>{obj.filename}</li>;
              } else {
                return <li className={styles.notClickable} key={i}>{obj.filename}</li>;
              }
          })}
          </ul>
        </div>
          <button onClick={(e) => self.goBack()}>Go Back</button>
      </div>
    );
  }
  returnFalse(e) {
    e.preventDefault();
    console.log('false');
    return false;
  }
  dragDrop(e) {
    e.preventDefault();
    for (let f of e.dataTransfer.files) {

var connSettings = {
     host: '192.168.88.88',
     port: 22, // Normal is 22 port
     username: 'vagrant',
     password: 'vagrant'
     // You can use a key file too, read the ssh2 documentation
};
var self = this;
var remotePathToList = self.state.dir;

var conn = new Client();
conn.on('ready', function() {
    conn.sftp(function(err, sftp) {
         if (err) throw err;
         
        var fs = require("fs"); // Use node filesystem
        var readStream = fs.createReadStream( f.path );

    var segments = f.path.split('/');
    var fname = segments.slice(-1).pop();

        var writeStream = sftp.createWriteStream( remotePathToList + fname );

        writeStream.on('close',function () {
            alert('file transferred succesfully');

        });

        writeStream.on('end', function () {
            console.log( "sftp connection closed" );
            conn.close();
        });

        // initiate transfer of file
        readStream.pipe( writeStream );
    });
}).connect(connSettings);




    }
    return false;
  }
  goBack() {
    var connSettings = {
     host: '192.168.88.88',
     port: 22, // Normal is 22 port
     username: 'vagrant',
     password: 'vagrant'
     // You can use a key file too, read the ssh2 documentation
    };
    var self = this;
    var ps = self.state.dir;

    var segments = ps.split('/');
    segments.pop();
    segments.pop();
    segments.push("/");
    var backUrl = segments.join('/');


    var conn = new Client();
    self.setState({'dir': backUrl});
    var remotePathToList = backUrl;
    conn.on('ready', function() {
    conn.sftp(function(err, sftp) {
         if (err) throw err;
         // you'll be able to use sftp here
         // Use sftp to execute tasks like .unlink or chmod etc
         sftp.readdir(remotePathToList, function(err, list) {
                if (err) throw err;
                // List the directory in the console
                self.setState({'list': list});
                // Do not forget to close the connection, otherwise you'll get troubles
                conn.end();
         });
    });
    }).connect(connSettings); 
  }
  changeDir(e) {
    var connSettings = {
      host: '192.168.88.88',
      port: 22, // Normal is 22 port
      username: 'vagrant',
      password: 'vagrant'     // You can use a key file too, read the ssh2 documentation
    };
    var self = this;
    var ps = self.state.dir;
    var conn = new Client();
    self.setState((prevState) => ({
      'dir': prevState.dir + e + '/'
    }));
    var remotePathToList = ps + e + '/';
    conn.on('ready', function() {
    conn.sftp(function(err, sftp) {
         if (err) throw err;
         // you'll be able to use sftp here
         // Use sftp to execute tasks like .unlink or chmod etc
         sftp.readdir(remotePathToList, function(err, list) {
                if (err) throw err;
                // List the directory in the console
                self.setState({'list': list});
                // Do not forget to close the connection, otherwise you'll get troubles
                conn.end();
         });
    });
    }).connect(connSettings); 
  }

  handleClick() {
    var connSettings = {
      host: '192.168.88.88',
      port: 22, // Normal is 22 port
      username: 'vagrant',
      password: 'vagrant'     // You can use a key file too, read the ssh2 documentation
    };
    var self = this;
    var conn = new Client();
    var remotePathToList = '/var/www/';
    self.setState({'dir': remotePathToList});
    conn.on('ready', function() {
    conn.sftp(function(err, sftp) {
         if (err) throw err;
         // you'll be able to use sftp here
         // Use sftp to execute tasks like .unlink or chmod etc
         sftp.readdir(remotePathToList, function(err, list) {
                if (err) throw err;
                // List the directory in the console
                self.setState({'list': list});
                // Do not forget to close the connection, otherwise you'll get troubles
                conn.end();
         });
    });
    }).connect(connSettings);

  }
}

/*
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
      */

export default Home;
