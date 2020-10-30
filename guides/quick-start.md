---
layout: layout-page-docs
css-section: docs
parent: "Tutorials and Guides"
parentPath: guides
title: "Quick Start Guide"
subtitle: "Enclave Documentation"
contentPreview: "A short guide to installing, licensing and running Enclave on Linux and Windows. Learn how to use the command line and user interface to get your first networks up and running as quickly as possible."
indexed: true
redirect_from:
 - /quick-start
 - /quick-start-cli
---

# {{page.title}}

> **Note:** This guide applies to the following operating systems:
> * Windows 7, 8 and 10
> * Windows Server 2012, 2016 and 2019
> * Ubuntu 16.04 LTS and 18.04 LTS
> * CentOS 7

Enclave is software which builds private, secure and directly connected computer networks.

Each system running Enclave gets issued a certificate. The operators of each system exchange the names on their respective certificates, and instantly get a secure, directly connected, and private network.

Setting up a connection between two or more systems requires mutual consent from all parties, and Enclave networks can only be established if all parties have exchanged their certificate names and agreed to cooperate with one another.

<video poster="/media/quick-start-poster.png" id="player" muted playsinline controls>
    <source src="/media/quick-start.mp4" type="video/mp4" />
</video>

<!-- https://github.com/sampotts/plyr -->
<script src="https://cdn.plyr.io/3.5.0/plyr.js"></script>
<script>
    const player = new Plyr('#player');
</script>

## Installing on Windows

1. From the [downloads section](https://portal.enclave.io/dashboard/download) of your account in the [Enclave Portal](https://portal.enclave.io/), download the latest version of Enclave and run the installer.

## Installing on Linux

1. From the [downloads section](https://portal.enclave.io/dashboard/download) of your account in the [Enclave Portal](https://portal.enclave.io/), select the appropriate installation script for your operating system and run in your terminal. If `sudo` is required you will be prompted.

2. On Linux-based systems, the Enclave binaries unpack to `/opt/enclave/` and configuration and log files reside in `/etc/opt/enclave/`. Once installed, the installation script will display the following message:

   ```
   Installation finished.
   Run sudo enclave license [LICENSE_KEY] to request a certificate.
       sudo systemctl start enclave to start enclave, or sudo enclave start to start as an interactive foreground process.
       sudo enclave add [PEER_NAME] to authorise a connection to another system running enclave.
       sudo enclave for status.
   ```

## Licencing Enclave

To use Enclave, your system requires a certificate. License keys (available from the [Manage License Keys](https://portal.enclave.io/dashboard/licenses) section of your account in the [Enclave Portal](https://portal.enclave.io/)) allow Enclave to request certificates. If you have a trial account, a `30 day trial` license key will have been automatically generated for you.

### User Interface

2. When Enclave starts, use the license key from the [Enclave Portal](https://portal.enclave.io/) to request a certificate unique to your system. Enclave will generate a private key on your local system and encrypt it using the Windows Data Protection API. With a valid license, Enclave will then obtain a certificate for your system from the Enclave Certificate Authority.

### Command Line

1. With Enclave installed, Run Enclave using the `license` argument to provide a valid license. This will generate a new `Universe` profile file located at `/etc/opt/enclave/profiles/Universe.profile` containing configuration, your encrypted private key, and the newly issued certificate.

   In this example, . Keep the license key safe, without it you cannot request certificates.

   ```bash
   $ sudo enclave license
   Enter license key:
   ```

   You may also pass the license key as an argument, the example license key we're using here is `9DPLF-4L6T9-FYCR2-9D342-K85TT` but be aware that your license key may end up in your command line history.
   
   ```bash
   $ sudo enclave license 4WPLF-4L6T9-FYCR2-9D342-K85TT
   ```

   Once the system has been licensed and issued with a certificate, Enclave can be started.

## Starting and Stopping Enclave

### User Interface

On Windows, the tray application will have automatically started the Enclave network for you.

### Command Line

   ```bash
   $ sudo systemctl start enclave
   ```

Alternatively, Enclave can be run interactively using the `start` argument.

   ```bash
   $ sudo enclave start
   ```

Once running, the `status` verb provides a snapshot of Enclave network health and peer connectivity.

   ```
   $ enclave status
   
   Local Identity: WZG24
   
      Release Version . . : 2019.9.25.0
      Profile Name. . . . : Universe
      Profile Location. . : /etc/opt/enclave/profiles/Universe.profile
      Certificate . . . . : CN=WZG24 Expires=Never (Perpetual Issue)
      Adapter Index . . . : tap0 (#4)
      Binding Address . . : 0.0.0.0:36019
      Virtual Network . . : 100.64.0.0/10 (255.192.0.0)
      Virtual Address . . : 100.77.23.184
   
   Peer: discover.enclave.io
   
      Peer State. . . . . : Up
      Certificate . . . . : CN=discover.enclave.io Expires=08/06/2024 09:59:59
      Endpoint. . . . . . : Tcp/35.176.215.206:443
   ```

## Creating connections

In order to establish a connection, both sides must agree that the connection should take place. This means Alice must authorise Bob, and Bob must authorise Alice. To do this, operators exchange their certificate names.

### User Interface

1. Enclave will display your local certificate name as **Local Identity**. Give this name to your partner, and get your partner's Enclave identity in return. In this example, our local certificate name is `WZG24`.

2. If your partner's certificate name is `72LVG` then use the `New Connection` button to authorise your system to connect with theirs. They should do 

3. Your partner should do the same in return and authorise their Enclave network to connect to your certificate name.
   
   ![Example Issue Token](/img/docs/highlighted-authorise-connection.png)

4. When both systems have expressed a mutual intent to communicate, Enclave will automatically handle firewall traversal, peer discovery and key exchange to setup a direct and end-to-end encrypted connection between the cooperating parties.

   The connection will remain in place until either;

   * One side loses their network connection. Once restored, Enclave will re-establish network tunnel.
   * One (or both) sides remove the authorisation they made to talk with their partner, at which point the connection is destroyed.
   * One (or both) certificates expire, at which point the connection is destroyed.

> **Key Principle** — unlike traditional Certificate Authorities, you do not need to specify a domain name, or hostname in order to obtain a certificate. The CA randomly selects the name for each certificate it issues. All communication in Enclave networks is mutually authenticated, so endpoints have no strong real-world identity association to their certificates other than ownership of the corresponding private keys.
>
> For this reason, the Certificate Authority selects names which are are short, sharable and human friendly — like telephone numbers, or car registration number plates.

### Command Line

To continue to example, assume we are Alice and our partner is Bob. We have the following certificate names;

| Person | Certificate Name |
| ------ | ---------------- |
| Alice  | `WZG24`          |
| Bob    | `72LVG`          |

We will authorise Bob's certificate using the `add` verb, and describe `-d` in a familiar way that this certificate name belongs to Bob.

```sh
$ enclave add 72LVG -d "Bob"
```

On Bob's system, he must now make a counter assertion that he wants to to us. Until then, no connection is possible.

```sh
$ enclave add WZG24 -d "Alice"
```

Once a mutual assertion is made by both parties, Enclave will setup the connection and establish a private, shared virtual network between the parties which can be used for any application or service.

> Enclave traffic is subject to filtering by the local firewall. Pay particular attention to the local firewall configuration, Without explicitly permitting traffic to cross an Enclave network port, peers may connect but fail to exchange network traffic.

In order to check the status of the connection, use the `status` verb.

```sh
$ enclave status
```

## Removing connections

All connections in Enclave require mutual consent from both parties. Either party may change their mind at any time and tear down the connection. This is done by removing the authorisation created in the previous section.

### User Interface

Right click on the partner connection you want to terminate and click remove.

### Command Line

Bob may terminate his connection with us by removing the authorisation he made to communicate with our certificate name.

```sh
$ enclave remove WZG24
```