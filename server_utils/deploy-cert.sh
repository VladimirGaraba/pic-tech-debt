#!/bin/sh

set -e

for domain in $RENEWED_DOMAINS; do
        case $domain in
        demo.poisons-info.center)
                daemon_cert_root=/opt/couchdb/etc/certs

                # Make sure the certificate and private key files are
                # never world readable, even just for an instant while
                # we're copying them into daemon_cert_root.
                umask 077

                cp "$RENEWED_LINEAGE/fullchain.pem" "$daemon_cert_root/$domain.cert"
                cp "$RENEWED_LINEAGE/privkey.pem" "$daemon_cert_root/$domain.key"

                # Apply the proper file ownership and permissions for
                # the daemon to read its certificate and key.
                chown couchdb:couchdb "$daemon_cert_root/$domain.cert" \
                        "$daemon_cert_root/$domain.key"
                chmod 400 "$daemon_cert_root/$domain.cert" \
                        "$daemon_cert_root/$domain.key"

                service couchdb restart >/dev/null
                service nginx reload >/dev/null
                ;;
        db.poisons-info.center|staging.poisons-info.center|db.picsi.co|staging.picsi.co|demo.picsi.co)
                service nginx reload >/dev/null
                ;;
        esac
done
