#!/bin/bash
for f in $(find ./docs -name *.md)
do
	aspell --dont-backup --mode=tex check $f
	echo 'Checked' $f
done
