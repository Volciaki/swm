#!/bin/sh

set -e 

yarn generate:api

docusaurus build
