# 
arr = {}

Dir.glob('*/') { |folder|
  Dir.glob("#{folder}*").reject { |e| 
    # filter out extraneous c and ruby files 
    e[/Gemfile/] or e[/\.out/] 
  }.each do |file|
    
  end


}