# Generating ORM Models from DB

We're using https://github.com/krlove/eloquent-model-generator to generate Model classes from DB

Something like this should work:
    php artisan krlove:generate:model TblOrganisation --table-name=tblOrganisation
