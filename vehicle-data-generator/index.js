
/*

In this file you will find how we send raw data to other services via nats
There are 2 question points for you to tell us the answer on your presentation
If you're up for it

*/
const csvParse = require("csv-parse")
const fs = require("fs")
const Writable = require("stream").Writable

// NATS Server is a simple, high performance open source messaging system
// for cloud native applications, IoT messaging, and microservices architectures.
// https://nats.io/
// It acts as our pub-sub (https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)
// mechanism for other service that needs raw data
const NATS = require("nats")

// At this point, do not forget to run NATS server!

// NATS connection happens here
// After a connection is made you can start broadcasting messages (take a look at nats.publish())
const nats = NATS.connect({ json: true })

// This function will start reading out csv data from file and publish it on nats
const readOutLoud = (vehicleName) => {
	// Read out meta/route.csv and turn it into readable stream
	const fileStream = fs.createReadStream("./meta/route.csv")
	// =========================
	// Question Point 1:
	// What's the difference betweeen fs.createReadStream, fs.readFileSync, and fs.readFileAsync?
	// And when to use one or the others
	// =========================
	/*
		readFileSync and readFile(Async) are both fully buffered process which means that the entire file content is read into the buffer
		(temporary place in memory) & then processed. The only difference is that readFileSync is a blocking process which means the process
		will be blocked until the entire file content is loaded in the memory whereas readFile(Async) is non-blocking process that takes a 
		callback so that the process can perform other actions while the file content is being read & once it is read, it will execute the
		callback function.

		In a single threaded process, it is always preferred to use the Asynchornous version "readFile(Async)" so that the main thread is
		not blocked for an I/O operation. Just imagine, your HTTP server blocking requests while it is busy reading a 500MB file.

		However, there are cases where you can prefer using the synchornous version "readFileSync". For example, you can use readFileSync 
		to load your SSL files before you start your server since you need to block until the files are ready.

		createReadStream is a partially buffered process meaning that your entire file content is not loaded in the buffer, instead it gets
		delivered as a stream of chunks. One chunk is loaded in the buffer, it gets processed, discarded from buffer & then the next chunk
		is loaded in the buffer & so on and so forth.
		The benefits of using streams are time and memory efficiency. NodeJS streams are powerful way of file read/write and network communication.
		We can use async iterators with streams or nodejs provides piping mechanisms where we can pipe an output of one stream as an input
		to another stream. (Like you have done in this code sample as well)
	*/

	// Now comes the interesting part,
	// Handling this filestream requires us to create pipeline that will transform the raw string
	// to object and sent out to nats
	// The pipeline should looks like this
	//
	//  File -> parse each line to object -> published to nats
	//

	let i = 0

	return (fileStream
		// Filestream piped to csvParse which accept nodejs readablestreams and parses each line to a JSON object
		.pipe(csvParse({ delimiter: ",", columns: true, cast: true }))
		// Then it is piped to a writable streams that will push it into nats
		.pipe(new Writable({
			objectMode: true,
			write(obj, enc, cb) {
				// setTimeout in this case is there to emulate real life situation
				// data that came out of the vehicle came in with irregular interval
				// Hence the Math.random() on the second parameter
				setTimeout(() => {

					i++
					if ((i % 100) === 0)
						console.log(`vehicle ${vehicleName} sent have sent ${i} messages`)

					// The first parameter on this function is topics in which data will be broadcasted
					// it also includes the vehicle name to seggregate data between different vehicle

					nats.publish(`vehicle.${vehicleName}`, obj, cb)

				}, Math.ceil(Math.random() * 150))
			}
		})))
	// =========================
	// Question Point 2:
	// What would happend if it failed to publish to nats or connection to nats is slow?
	// Maybe you can try to emulate those slow connection
	// =========================
}

// This next few lines simulate Henk's (our favorite driver) shift
console.log("Henk checks in on test-bus-1 starting his shift...")
readOutLoud("test-bus-1")
	.once("finish", () => {
		console.log("henk is on the last stop and he is taking a cigarrete while waiting for his next trip")
	})
// To make your presentation interesting maybe you can make henk drive again in reverse