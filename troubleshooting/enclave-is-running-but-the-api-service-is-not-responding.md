---
layout: layout-page-docs
css-section: docs-troubleshooting
parent: Troubleshooting
parentPath: troubleshooting
title: "Enclave is running but the API service is not responding"
subtitle: "Enclave continues to provide networking, but reports that the API service is not responding"
contentPreview: "On Windows computers Enclave may continue to provide network connectivity to peers, but reports that the API service is not responding"
indexed: true
---

# {{page.title}}

In certain circumstances on Windows computers Enclave may continue to provide network connectivity to peers, but the user interface may report that the API service is not responding, preventing local administration.


## Symptoms

The Windows Tray application may report "Enclave is running but the API service is not responding"

## Cause

Microsoft has confirmed that this is a problem with dotnet core and has issued a fix tracked in this GitHub issue [Single file: Guard against partial clean-up of extracted files #3778](https://github.com/dotnet/runtime/issues/3778). A fix is scheduled to be released as part of the servicing release in April 2020.

## Resolution

This issue has been fixed in the latest version of Enclave. Customers still running Enclave version `2020.4.20.0` should apply the following workaround:

1. Open an administrator command prompt
1. Run `sc stop "Enclave Fabric Supervisor"`
1. Delete the contents of `C:\Windows\Temp\.net\enclave`
1. In the Enclave Tray application use the "Request Start" button to start Enclave again

## Notes

> **Important:** This is not a problem caused by Enclave, but a bug in dotnet core. Some customers may encounter this bug during routine use of the product, which may also interfere an administrator's ability to use Enclave effectively.
