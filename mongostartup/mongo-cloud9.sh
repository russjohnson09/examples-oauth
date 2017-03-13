sudo apt-get install -y mongodb-org

mkdir /tmp/data

echo 'mongod --bind_ip=$IP --dbpath=/tmp/data --nojournal --rest "$@"' > .mongod

chmod a+x .mongod