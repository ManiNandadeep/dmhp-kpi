## Contains scripts to execute `autocannon` stress tests.

### Version : 1,0 (HRDATA, BASE route)

## How to run the tests: 
- We need the `requests` python library : `pip install requests`.
- Confirm its presence with `pip list`.
- Get the auth token by running `python generate_query.py`.
- Keep this, and the **absolute** path of the concerned sample stored procedure JSON query file(s) ready.
- Then, modify the values in `dmhp_autocannon_tests.sh`. You may check out `sample_autocannon_call.sh` for an example implementation.
- `chmod +x dmhp_autocannon_tests.sh`
- `./dmhp_autocannon_tests.sh`

#### Changing the flags can be done as per the guidelines given here : [Autocannon README](https://github.com/mcollina/autocannon#readme)
