<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Produtc;
use Faker\Generator as Faker;

$factory->define(Produtc::class, function (Faker $faker) {
    return [
        'name' => $faker->text($maxNbChars = 30),
        'slug' => $faker->slug(),
        'description' => $faker->text($maxNbChars = 200),
        'price' => $faker->randomFloat($nbMaxDecimals = 2, $min = 0, $max = 1000),
        'image' => $faker->imageUrl($width = 640, $height = 480), // 'http://lorempixel.com/640/480/'
        'status' => $faker->boolean(25)
    ];
});
