if [ -z "$1" ]
  then
    echo "No argument supplied"
    exit 1
fi

comp_path=./src/components

mkdir $comp_path/$1

touch $comp_path/$1/$1.tsx
touch $comp_path/$1/$1.css




