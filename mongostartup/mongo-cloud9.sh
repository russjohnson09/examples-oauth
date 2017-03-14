sudo apt-get install -y mongodb-org

mkdir /tmp/data
echo 'mongod --repair --dbpath /tmp/data' > .mongod
echo 'mongod --bind_ip=$IP --dbpath=/tmp/data --nojournal --rest "$@"' >> .mongod

chmod a+x .mongod


mongod --repair --dbpath /tmp/data
mongod --bind_ip=$IP --dbpath=/tmp/data --nojournal --rest "$@"