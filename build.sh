cd plugins/catalog-backend-module-ldap
rm -rf dist
rm -rf dist-dynamic
rm *.tgz
cd ..
cd ..
yarn workspace @backstage/plugin-catalog-backend-module-ldap export-dynamic
cd plugins/catalog-backend-module-ldap/dist-dynamic
npm pack
echo "sha256-"$(shasum -a 256 *.tgz | awk '{print $1}' | xxd -r -p | base64)