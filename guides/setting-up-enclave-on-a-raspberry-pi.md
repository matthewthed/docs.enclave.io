---
layout: layout-page-docs
css-section: docs
parent: "Tutorials and Guides"
parentPath: guides
title: "Setting up Enclave on a Raspberry Pi"
subtitle: "Enclave Documentation"
contentPreview: "Install Enclave on your Raspberry Pi and gain secure remote access and connectivity for any protocol to your RPi from anywhere in the world without DNS and public IP addresses, port forwarding, access control lists or inbound traffic from the Internet."
indexed: true
---

# {{page.title}}

Follow these steps to install Enclave on your Raspberry Pi running Raspbian 10 (x64):

## 1. Install

Open the [download page](https://portal.enclave.io/dashboard/download) section of your account in the Enclave Portal and copy the download link to the setup script for your Raspberry Pi and run it on your device.

## 2. Licence

Open the [new license page](https://portal.enclave.io/dashboard/licenses/new) section of your account in the Enclave Portal and provision a new license key for your Raspberry Pi if you need to. Alternatively, if an existing license is available, make note of the license key and use that to licencing the device.

License the device. If you don't supply the license key at the command line, Enclave will prompt you to enter the license.

```bash
$ sudo enclave license
```

## 3. Start

Start Enclave on the Raspberry Pi

```bash
$ sudo systemctl start enclave
```

## 4. Connect

Using Enclave Core, you must authorise a connection to other systems in order to build network connectivity. You will need to know the certificate name of each counterpart system.

In this example I will connect the Raspberry Pi to my office workstation so I can view its [Motion](https://motion-project.github.io/) camera feed remotely.

My workstation's certificate name is `72LVG` and on the Raspberry Pi I will authorise Enclave to allow connections with my workstation using the `add` command. The `-d` argument is a description (or friendly name) of this connection for future reference.

```bash
$ enclave add 72LVG -d "connection to office workstation"
```

The workstation will need to mutually authorise the Raspberry Pi connection aswell, and so the workstation needs to know the certificate name of the Raspberry Pi. Run `enclave status` on the Raspberry Pi to find its local certificate name.

## 5. Verify

You can find your Raspberry Pi's new Enclave IP address and connectivity to other peers by:

* Checking the Portal
* Running `ifconfig tap0`
* Running `enclave status`

> Having problems? Contact us [support@enclave.io](support@enclave.io)