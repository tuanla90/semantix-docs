# Google Sheets

Connect Google Sheets as a data source using a **Service Account**.

## Prerequisites

1. A Google Cloud project with the **Google Sheets API** and **Google Drive API** enabled
2. A Service Account with a JSON key file

## Setup in Google Cloud

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (or use an existing one)
3. Enable **Google Sheets API** and **Google Drive API**
4. Go to **IAM & Admin → Service Accounts → Create Service Account**
5. Download the **JSON key file**
6. Share your Google Sheet with the service account email (e.g. `semantix@your-project.iam.gserviceaccount.com`) with **Viewer** access

## Connect in Semantix

1. Go to **Admin → Connections → New Connection → Google Sheets**
2. Paste the contents of the JSON key file into the **Service Account Key** field
3. Click **Test Connection → Save**

## Browsing Sheets

Once connected, Semantix can:
- List all spreadsheets accessible to the service account
- Browse individual sheet tabs
- Auto-detect column headers and data types

> 💡 The service account can only access sheets that have been explicitly shared with its email address.
