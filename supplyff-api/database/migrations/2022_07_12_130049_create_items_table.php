<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('classified_id')->nullable()->constrained()->nullOnDelete();
            $table->integer('api_id');
            $table->integer('general_level')->nullable();
            $table->integer('elemental_level')->nullable();
            $table->string('element_type')->nullable();
            $table->string('random_bonus')->nullable();
            $table->integer('level_reduction')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
