#!/usr/bin/env bash
for i in $(find . -name "*xml"); do cat $i | xmllint --format - > $i.formatted; done
