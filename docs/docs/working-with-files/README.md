# Working with Files

## Open New Record

Every entry into PICSI is considered a *Record*. Records can be created
against a new File, or appended to an existing File.

### New File

Selecting the New Record button brings up the New Record dialog.
~[new record button](./new-record-button.png) 

In this dialog there is the option of creating a record against a new File, or against an existing File.
Selecting New File creates a new empty File.

~[new record dialog](./new-record-new-file.png)

### Update Existing File

There are two ways to update an existing File.

1.  Use the "New Record" button and select "Followup/Add Notes". This
    will change the dialog to enable the user to search for a specific
    File. Select this File and select "New Record".
2.  Select a File on the left hand side, or via the search button. Right
    click on the File and select "Update Case".

## Close Current Record

Once a record is opened, the button will change to "End Record". So to
close the current record manually, select this "End Record" button.
Alternatively you can right click on another record and select "Update
Case" and this will automatically close the current record, and open a
new record updating the File selected. 

~[end record button](./end-record-button.png)

## Close a File

Closing a File involves the left hand listing. Right clicking on the
File in the left hand list brings up a context menu offering a number of
options. Selecting "Close Pending Review" will move the File from "Open"
list to the "Pending Review". This allows for a second SPI to review the
File and close it.

~[mark closed pending review](./mark-close-pending.png)

When a file is marked "Closed Pending Review", an audit trail entry is
inserted, showing the time/date, the SPI and that the File was marked
"status (Closed Pending Review)".

## Review a File

To review a File, change the left hand side view to "Closed Pending
Review", then select the File as appropriate. Selecting "Closed Pending
Review" on the view filter, allows a SPI to see all Files marked for
review.

~[pending review view](./closed-pending-review-view.png)

Right clicking on the File in the left hand side brings up a context
menu with a number of options.

~[review context options](./review-context-options.png)

Selecting "Mark as Reviewed" will insert a record in the audit trail
showing the time/date and the SPI with the message "Status (Closed)".

~[audit trail for closed and reviewed](./audit-trail-close-n-reviewed.png)

## Delete a File

Only a site administrator can delete a File. It should be noted that the
File is never actually deleted, it remains in the system, but no longer
visible to normal users. 

~[delete file context menu](./context-delete-file.png) 

To delete a
File, the user selects the appropriate File on the left hand side,
either directly or via the search function. The they right click on the
File and select "Delete File"

 ~[delete file dialog](./delete-file-dialog.png)

## Link to an Incident

Files can be grouped into Incidents, this can be extracted via the
Analytic page and also displays the Files together. Only a site
administrator can create an incident and attach to or detach Files from
an incident.

 ~[context menu link file to incident](./context-link-incident.png)

## Change File between Case/Inquiry/Other

Sometimes a call begins as if it is simply an inquiry, but then becomes
obvious that it is an actual case. It is possible to change the File
type between Case/Inquiry/Other either on the fire record via the Quick
Entry tab, or between records by right clicking on the File on the left
hand side and selecting "Mark File as" and the appropriate File type.

~[change file type](./context-file-type.png)

