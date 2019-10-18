<template>
<div id="page-wrapper" class="gray-bg" style="min-height: 1000px;">
	<Toolbar></Toolbar>
	<PageInfo></PageInfo>
	<div class="wrapper wrapper-content animated fadeInRight">
		<div class="row">
			<div class="col-lg-12">
				<div class="ibox ">
					<div class="ibox-title">
						<h5>All form elements <small>With custom checbox and radion elements.</small></h5>
					</div>
					<div class="ibox-content">
						<form method="get">
							<div class="form-group  row"><label class="col-sm-2 col-form-label">Normal</label>

								<div class="col-sm-10"><input type="text" class="form-control"></div>
								</div>
								<div class="hr-line-dashed"></div>
								<div class="form-group row"><label class="col-sm-2 col-form-label">Help text</label>
									<div class="col-sm-10"><input type="text" class="form-control"> <span class="form-text m-b-none">A block of help text that breaks onto a new line and may extend beyond one line.</span>
									</div>
								</div>
								<div class="hr-line-dashed"></div>
								<div class="form-group row"><label class="col-sm-2 col-form-label">Password</label>

									<div class="col-sm-10"><input type="password" class="form-control" name="password"></div>
									</div>
									<div class="hr-line-dashed"></div>
									<div class="form-group row"><label class="col-sm-2 col-form-label">Placeholder</label>

										<div class="col-sm-10"><input type="text" placeholder="placeholder" class="form-control"></div>
										</div>
										<div class="hr-line-dashed"></div>
										<div class="form-group row"><label class="col-lg-2 col-form-label">Disabled</label>

											<div class="col-lg-10"><input type="text" disabled="" placeholder="Disabled input here..." class="form-control"></div>
											</div>
											<div class="hr-line-dashed"></div>
											<div class="form-group row"><label class="col-lg-2 col-form-label">Static control</label>

												<div class="col-lg-10">
													<p class="form-control-static">email@example.com</p>
												</div>
											</div>
											<div class="hr-line-dashed"></div>
											<div class="form-group row"><label class="col-sm-2 col-form-label">Checkboxes and radios <br>
													<small class="text-navy">Normal Bootstrap elements</small></label>

												<div class="col-sm-10">
													<div><label> <input type="checkbox" value=""> Option one is this and that—be sure to include why it's great </label></div>
													<div><label> <input type="radio" checked="" value="option1" id="optionsRadios1" name="optionsRadios"> Option one is this and that—be sure to
	                                            include why it's great </label></div>
													<div><label> <input type="radio" value="option2" id="optionsRadios2" name="optionsRadios"> Option two can be something else and selecting it will
	                                            deselect option one </label></div>
												</div>
											</div>
											<div class="hr-line-dashed"></div>
											<div class="form-group row">
												<div class="col-sm-4 col-sm-offset-2">
													<button class="btn btn-white btn-sm" type="submit">Cancel</button>
													<button class="btn btn-primary btn-sm" type="submit">Save changes</button>
												</div>
											</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="footer">
		<div class="float-right">
			10GB of <strong>250GB</strong> Free.
		</div>
		<div>
			<strong>Copyright</strong> Example Company © 2014-2018
		</div>
	</div>

</div>
</template>
<script>
import Toolbar from '@/view/layout/Toolbar'
import PageInfo from '@/view/layout/PageInfo'
export default {
	components: {
		Toolbar,
		PageInfo,
	},
	mounted() {
	}
}
</script>